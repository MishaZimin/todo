import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo } from './types';

export const todosAtom = atomWithStorage<Todo[]>('todos', []);

export const addTodoAtom = atom(null, (get, set, text: string) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    progress: 0,
  };
  set(todosAtom, [newTodo, ...get(todosAtom)]);
});

export const updateTodoAtom = atom(null, (get, set, updatedTodo: Todo) => {
  set(
    todosAtom,
    get(todosAtom).map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    ),
  );
});

export const deleteTodoAtom = atom(null, (get, set, id: string) => {
  set(
    todosAtom,
    get(todosAtom).filter((todo) => todo.id !== id),
  );
});
