'use client';

import { useAtom } from 'jotai';
import { todosAtom } from '@/shared/lib/store';

export const Header = () => {
  const [todos] = useAtom(todosAtom);

  return (
    <header className="py-4 bg-white/30 backdrop-blur-sm fixed top-0 flex flex-row items-center z-10 w-full max-w-[500px]">
      <h1 className="text-3xl font-bold text-gray-900 pl-2">
        мои задачи - <span className="text-gray-500">{todos.length}</span>
      </h1>
    </header>
  );
};
