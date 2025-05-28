'use client';

import { useAtom } from 'jotai';
import { todosAtom } from '@/shared/lib/store';

export const Header = () => {
  const [todos] = useAtom(todosAtom);

  return (
    <header className=" justify-between  py-4 bg-white/30 backdrop-blur-sm fixed top-0 items-center z-10 w-full max-w-[500px] flex flex-row ">
      <h1 className="text-3xl font-bold text-gray-900 pl-2">задачи</h1>
      <p className="text-gray-500 text-3xl font-bold px-2">{todos.length}</p>
    </header>
  );
};
