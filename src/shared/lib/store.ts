import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo } from './types';

export const todosAtom = atomWithStorage<Todo[]>('todos', []);

export const addTodoAtom = atom(null, (get, set, text: string) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    progress: 0, // По умолчанию 0%
    createdAt: Date.now(),
  };
  set(todosAtom, [...get(todosAtom), newTodo]);
});

export const updateTodoAtom = atom(null, (get, set, updatedTodo: Todo) => {
  set(
    todosAtom,
    get(todosAtom).map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    ),
  );
});

// Атом для удаления задачи
export const deleteTodoAtom = atom(null, (get, set, id: string) => {
  set(
    todosAtom,
    get(todosAtom).filter((todo) => todo.id !== id),
  );
});
