'use client';

import { useAddTodoMutation } from "@/lib/features/todo/todoApiSlice";
import { FormEvent, useState } from "react";


export const Form = () => {
  const [title, setTitle] = useState("");
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        const todo = await addTodo({ title, completed: false, userId: 1 });
        setTitle("");
      } catch (error) {
        console.error('Failed to add todo:', error);
      }

    } else {
      alert('Please enter a todo title.');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Add a new todo..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={isAdding}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {isAdding ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

