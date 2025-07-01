'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface ContactDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const { theme } = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className={`w-full max-w-md rounded-lg shadow-xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Get in Touch</h2>
                <button
                  onClick={onClose}
                  className={`text-gray-500 hover:text-gray-700 ${theme === 'dark' ? 'hover:text-gray-300' : ''} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                    } focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                    } focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                    } focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
