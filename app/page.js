'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Pencil, Trash, Check, Sparkles } from 'lucide-react'

export default function Component() {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputText, completed: false }])
      setInputText('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id) => {
    setEditingId(id)
    const todo = todos.find(t => t.id === id)
    if (todo) setInputText(todo.text)
  }

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: inputText } : todo
      ))
      setEditingId(null)
      setInputText('')
    }
  }

  const clearAll = () => {
    setTodos([])
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div className="dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 bg-gradient-to-br from-blue-100 via-white to-pink-100 flex-grow flex flex-col">
        {/* Header */}
        <header className="border-b dark:border-slate-700 bg-white/30 dark:bg-white/10 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                <span className="font-bold text-xl dark:text-white">TodoAI</span>
              </div>
              <nav className="hidden md:flex space-x-4">
                {['Home', 'About', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} passHref>
                    <Button variant="ghost" className="dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300">
                      {item}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="dark:text-yellow-300 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Todo Input Section */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
                <Sparkles className="mr-2 text-yellow-400" /> Todo List
              </h2>
              <div className="space-y-4">
                <Input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Insert here..."
                  className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={editingId !== null ? saveEdit : addTodo}
                    className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-00 hover:to-green-800 text-white  transition-all duration-300 transform hover:scale-105"
                  >
                    {editingId !== null ? 'Save Todo' : 'New Todo'}
                  </Button>
                  <Button
                    onClick={clearAll}
                    className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Todo List Section */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
                <Sparkles className="mr-2 text-yellow-400" /> List
              </h2>
              <div className="space-y-2">
                {todos.map(todo => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 rounded bg-white/70 dark:bg-slate-700/70 transition-all duration-300 hover:shadow-md"
                  >
                    <span className={`dark:text-white ${todo.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                      {todo.text}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditing(todo.id)}
                        className="text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleComplete(todo.id)}
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t dark:border-slate-700 bg-white/30 dark:bg-white/10 backdrop-blur-md mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                <span className="font-bold text-xl dark:text-white">TodoAI</span>
              </div>
              <nav className="flex space-x-4">
                {['Home', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} passHref>
                    <Button variant="ghost" className="dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300">
                      {item}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-300">
              © 2024 TodoAI. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}