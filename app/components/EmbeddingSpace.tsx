"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { matches } from "./Search";

export type Vec = { id: string; label: string; cluster: string; text: string };

type Node = Vec & { pos: THREE.Vector3 };
type Hub = { name: string; pos: THREE.Vector3 };

const palettes = {
  dark: { node: "#8fb0ff", hub: "#e8eeff", edge: "#8fb0ff", match: "#ffd84d", fog: "#0f1c44" },
  light: { node: "#2350d6", hub: "#0b1a3d", edge: "#2350d6", match: "#d99a00", fog: "#f8faff" },
};

// Small deterministic PRNG so the layout is the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Clusters sit on a sphere; each item scatters around its cluster's hub,
// the way related chunks land near each other in an embedding space.
function layout(points: Vec[]) {
  const rand = mulberry32(29);
  const names = Array.from(new Set(points.map((p) => p.cluster)));
  // Hubs go round a ring, alternating up and down, so no two clusters
  // (or their labels) sit on top of each other.
  const hubs: Hub[] = names.map((name, i) => {
    const theta = (i / names.length) * Math.PI * 2;
    return {
      name,
      pos: new THREE.Vector3(Math.cos(theta) * 2.3, i % 2 ? 0.95 : -0.95, Math.sin(theta) * 2.3),
    };
  });
  const hubOf = new Map(hubs.map((h) => [h.name, h]));
  const nodes: Node[] = points.map((p) => {
    const dir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    const dist = 0.3 + rand() * 0.55;
    return { ...p, pos: hubOf.get(p.cluster)!.pos.clone().addScaledVector(dir, dist) };
  });
  return { nodes, hubs, hubOf };
}

function segments(pairs: [THREE.Vector3, THREE.Vector3][]) {
  const arr = new Float32Array(pairs.length * 6);
  pairs.forEach(([a, b], i) => {
    arr.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
  });
  return arr;
}

function Lines({ positions, color, opacity }: { positions: Float32Array; color: string; opacity: number }) {
  return (
    <lineSegments key={positions.length}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

type Labels = RefObject<Map<string, HTMLSpanElement>>;

function Scene({
  nodes,
  hubs,
  hits,
  searching,
  dark,
  still,
  labels,
  onHover,
}: {
  nodes: Node[];
  hubs: Hub[];
  hits: Set<string>;
  searching: boolean;
  dark: boolean;
  still: boolean;
  labels: Labels;
  onHover: (id: string | null) => void;
}) {
  const c = dark ? palettes.dark : palettes.light;
  const group = useRef<THREE.Group>(null);
  const query = useRef<THREE.Mesh>(null);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const graph = useMemo(() => {
    const hubOf = new Map(hubs.map((h) => [h.name, h]));
    const pairs: [THREE.Vector3, THREE.Vector3][] = nodes.map((n) => [hubOf.get(n.cluster)!.pos, n.pos]);
    hubs.forEach((h, i) => pairs.push([h.pos, hubs[(i + 1) % hubs.length].pos]));
    return segments(pairs);
  }, [nodes, hubs]);

  const retrieval = useMemo(
    () => segments(nodes.filter((n) => hits.has(n.id)).map((n) => [new THREE.Vector3(), n.pos])),
    [nodes, hits]
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (!still) g.rotation.y += dt * 0.07;
    if (query.current) {
      query.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * (still ? 0 : 0.15));
    }
    // Pin each HTML label to its point's projected screen position.
    const { width, height } = state.size;
    const place = (id: string, pos: THREE.Vector3, lift: number) => {
      const el = labels.current?.get(id);
      if (!el) return;
      scratch.set(pos.x, pos.y + lift, pos.z);
      g.localToWorld(scratch).project(state.camera);
      const x = (scratch.x * 0.5 + 0.5) * width;
      const y = (-scratch.y * 0.5 + 0.5) * height;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    };
    hubs.forEach((h) => place(`hub-${h.name}`, h.pos, 0.3));
    nodes.forEach((n) => place(n.id, n.pos, 0.2));
    // Labels stay hidden until they've been placed once, so they never flash in a corner.
    const root = labels.current?.values().next().value?.parentElement;
    if (root && !root.dataset.ready) root.dataset.ready = "true";
  });

  return (
    <>
      <fog attach="fog" args={[c.fog, 6.5, 12.5]} />
      <group ref={group}>
        <Lines positions={graph} color={c.edge} opacity={searching ? 0.08 : 0.22} />

        {hubs.map((h) => (
          <mesh key={h.name} position={h.pos}>
            <octahedronGeometry args={[0.07]} />
            <meshBasicMaterial color={c.hub} transparent opacity={searching ? 0.35 : 1} />
          </mesh>
        ))}

        {nodes.map((n) => {
          const hit = hits.has(n.id);
          return (
            <mesh
              key={n.id}
              position={n.pos}
              scale={hit ? 1.9 : 1}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                onHover(n.id);
              }}
              onPointerOut={() => onHover(null)}
            >
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshBasicMaterial
                color={hit ? c.match : c.node}
                transparent
                opacity={searching && !hit ? 0.15 : 0.95}
              />
            </mesh>
          );
        })}

        {searching && hits.size > 0 && (
          <>
            <Lines positions={retrieval} color={c.match} opacity={0.85} />
            <mesh ref={query}>
              <icosahedronGeometry args={[0.11, 1]} />
              <meshBasicMaterial color={c.match} wireframe />
            </mesh>
          </>
        )}
      </group>
    </>
  );
}

export default function EmbeddingSpace({
  points,
  terms,
  dark,
}: {
  points: Vec[];
  terms: string[];
  dark: boolean;
}) {
  const [still, setStill] = useState(false);
  const [touch, setTouch] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const labels = useRef(new Map<string, HTMLSpanElement>());

  const { nodes, hubs } = useMemo(() => layout(points), [points]);
  const searching = terms.length > 0;
  const hits = useMemo(
    () => new Set(searching ? nodes.filter((n) => matches(terms, n.text)).map((n) => n.id) : []),
    [nodes, terms, searching]
  );

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse)");
    setStill(motion.matches);
    setTouch(coarse.matches);
    const onMotion = () => setStill(motion.matches);
    motion.addEventListener("change", onMotion);
    return () => motion.removeEventListener("change", onMotion);
  }, []);

  const keep = (id: string) => (el: HTMLSpanElement | null) => {
    if (el) labels.current.set(id, el);
    else labels.current.delete(id);
  };

  return (
    <div className="fig__stage">
      <Canvas
        camera={{ position: [0, 0.8, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: touch ? "pan-y" : "none" }}
      >
        <Scene
          nodes={nodes}
          hubs={hubs}
          hits={hits}
          searching={searching}
          dark={dark}
          still={still}
          labels={labels}
          onHover={setHovered}
        />
        {/* On touch screens a drag should scroll the page, not spin the figure. */}
        {!touch && <OrbitControls enableZoom={false} enablePan={false} enableDamping rotateSpeed={0.5} />}
      </Canvas>
      <div className="fig__labels" aria-hidden="true">
        {hubs.map((h) => (
          <span key={h.name} ref={keep(`hub-${h.name}`)} className="fig-label" data-faded={searching}>
            {h.name}
          </span>
        ))}
        {nodes.map((n) => (
          <span
            key={n.id}
            ref={keep(n.id)}
            className="fig-tip"
            data-show={n.id === hovered || (hits.has(n.id) && hits.size <= 6)}
          >
            {n.label}
          </span>
        ))}
      </div>
    </div>
  );
}
