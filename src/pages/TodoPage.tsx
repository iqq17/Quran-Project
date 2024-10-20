import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Load todos from local storage or API
    const savedTodos = localStorage.getItem('quranTodos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem('quranTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 bg-[#f2f1ec] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#365b6d]">Quran To-Do List</h1>
      
      <div className="mb-6 flex">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new Quran-related task..."
          className="flex-grow mr-2"
        />
        <Button onClick={addTodo} className="bg-[#365b6d] text-white">
          <Plus className="mr-2" /> Add Task
        </Button>
      </div>

      <motion.ul className="space-y-4">
        {todos.map(todo => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center bg-white p-4 rounded-lg shadow"
          >
            <CheckSquare
              className={`mr-4 cursor-pointer ${todo.completed ? 'text-green-500' : 'text-gray-400'}`}
              onClick={() => toggleTodo(todo.id)}
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </span>
            <Trash2
              className="text-red-500 cursor-pointer"
              onClick={() => deleteTodo(todo.id)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default TodoPage;
