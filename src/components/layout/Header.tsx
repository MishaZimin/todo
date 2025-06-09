'use client';

import { useAtom } from 'jotai';
import { todosAtom } from '@/shared/lib/store';

export const Header = () => {
  const [todos] = useAtom(todosAtom);

  return (
    <header className=" rounded-b-[0px] justify-between pt-2.5 pb-3 px-4 bg-white/30 backdrop-blur-md border sm:border-0 border-b-gray-200 fixed top-0 items-center z-10 w-full max-w-[500px] flex flex-row ">
      <h1 className="text-3xl font-bold text-gray-700 ">задачи</h1>
      <p className="text-gray-500 text-3xl font-bold ">{todos.length}</p>
    </header>
  );
};
