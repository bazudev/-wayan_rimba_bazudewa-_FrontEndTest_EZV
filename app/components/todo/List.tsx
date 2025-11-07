'use client';

import { useDeleteTodoMutation, useGetTodosQuery } from "@/lib/features/todo/todoApiSlice";


export const List = ({ page, limit }: { page: number, limit: number }) => {

  const start = (page - 1) * limit;
  const { data, isError, isLoading, isSuccess } = useGetTodosQuery({ start: start, limit: limit });
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  return (
    <ul className="space-y-2" style={{ paddingLeft: '0px' }}>
      {data?.map((todo, i) => (
        <li key={`todo-${i}`} style={{ display: 'flex', gap: '10px', paddingTop: '5px' }} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => { }}
              className="w-5 h-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400"
            />
            <span className="text-gray-800">{todo.title}</span>
          </div>
          <button onClick={() => deleteTodo(todo.id)} disabled={isDeleting} className="text-red-500 hover:text-red-700 font-semibold">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
