import { Todo } from "@/lib/definition/todo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApiSlice = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
	tagTypes: ['Todos'],
	endpoints: (build) => ({
		getTodos: build.query<Todo[], ({ start: number, limit: number })>({
			query: ({ start, limit }) => `/todos?_start=${start}&_limit=${limit}`,
			providesTags: (result) => result ? [{ type: 'Todos', id: 'LIST' }] : [{ type: 'Todos', id: 'LIST' }],
		}),
		addTodo: build.mutation<Todo, Partial<Todo>>({
			query: (body) => ({
				url: `/todos`,
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
		}),
		deleteTodo: build.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
		}),

	}),

});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } = todoApiSlice;
