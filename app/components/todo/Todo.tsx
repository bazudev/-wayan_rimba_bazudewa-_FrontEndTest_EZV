'use client';

import { Todo } from "@/lib/definition/todo";
import { Form } from "./Form";
import { List } from "./List";
import { useState } from "react";

// generate pagination dengan ellipsis 
export default function TodoListPage({ initialTodos, total }: { initialTodos?: Array<Todo>, total?: number }) {
  const [page, setPage] = useState(1);

  const limit = 5;
  const totalPages = (total ?? 0) / limit; // misal kita batasi 4 page 


  const handlePageClick = (p: number) => setPage(p);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages ?? 0, p + 1));
  const renderPageNumbers = (totalPages: number) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(<button key={i} onClick={() => handlePageClick(i)}
          style={{ fontWeight: page === i ? "bold" : "normal" }} > {i}
        </button>);
      } else if ((i === 2 && page > 3) || (i === totalPages - 1 && page < totalPages - 2)) {
        pages.push(<span key={`dots-${i}`}>...</span>);
      }
    }
    return pages;
  };


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Todo List
        </h1>

        {/* Input Form */}
        <Form />

        {/* Todo List */}
        <List page={page} limit={limit} />

        {/* Pagination Controls  */}
        <button onClick={handlePrev} disabled={page === 1}> Prev </button>
        {renderPageNumbers(totalPages ?? 0)}
        <button onClick={handleNext} disabled={page === totalPages}> Next </button>
      </div>
    </div>);
}
