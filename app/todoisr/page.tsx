import TodoListPage from "../components/todo/Todo";


export const revalidate = 30; // revalidate every 30 seconds


export default async function TodoISRPage() {
  // ssr fetch 
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', { next: { revalidate: revalidate } });
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await res.json();
  const total = data.length;


  return <TodoListPage initialTodos={data} total={total} />
}
