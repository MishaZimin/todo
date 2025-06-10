'use client';

import { useAtom } from 'jotai';
import { todosAtom } from '@/shared/lib/store';

export const Header = () => {
  const [todos] = useAtom(todosAtom);

  return (
    <header className=" rounded-b-[0px] justify-between pt-2.5 pb-3 px-4 bg-zinc-900/30 backdrop-blur-md border-b-0 border-b-zinc-700 fixed top-0 items-center z-10 w-full max-w-[500px] flex flex-row ">
      <h1 className="text-3xl font-bold text-zinc-300 ">задачи</h1>
      <p className="text-zinc-300 text-3xl font-bold ">{todos.length}</p>
    </header>
  );
};
