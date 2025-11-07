import TodoListPage from "../components/todo/Todo";

export const dynamic = 'force-dynamic';

async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await res.json();
  const total = data.length;
  return { data, total };
}


export default async function TodoSSRPage() {
  // ssr fetch 
  const { data, total } = await getTodos();


  return <TodoListPage initialTodos={data} total={total} />
}
