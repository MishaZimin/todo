'use client';

import { useAtom } from 'jotai';
import { TodoCard } from '@/components/todo/TodoCard';
import { todosAtom } from '@/shared/lib/store';
import { useEffect, useState } from 'react';

export const TodoList = () => {
  const [todos] = useAtom(todosAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-2 px-2 pb-20 pt-[72px]">
      {isClient && todos.length > 0 ? (
        [...todos]
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((todo) => (
            <TodoCard key={todo.id} todo={todo} className="bg-white" />
          ))
      ) : (
        <div className="flex justify-start items-center h-full text-center text-gray-500">
          {isClient ? 'пусто' : ''}
        </div>
      )}
    </div>
  );
};
