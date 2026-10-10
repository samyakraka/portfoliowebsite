"use client";

import { createContext, Fragment, useContext } from "react";

const QueryContext = createContext<string[]>([]);

export const QueryProvider = QueryContext.Provider;

export function toTerms(query: string) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Terms match from the start of a word, so "rag" finds "RAG" but not "storage".
const wordStart = (term: string) => `(?<![a-z0-9])${escape(term)}`;

// Every term must appear somewhere in the item's text.
export function matches(terms: string[], ...text: (string | undefined)[]) {
  if (terms.length === 0) return true;
  const haystack = text.join(" ");
  return terms.every((t) => new RegExp(wordStart(t), "i").test(haystack));
}

export function useTerms() {
  return useContext(QueryContext);
}

// Wraps every occurrence of a search term in <mark>.
export function Hi({ children }: { children: string }) {
  const terms = useTerms();
  if (terms.length === 0) return <>{children}</>;
  const re = new RegExp(`(${terms.map(wordStart).join("|")})`, "gi");
  const parts = children.split(re);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
