'use client';

import { useAtom } from 'jotai';
import { todosAtom } from '@/shared/lib/store';

export const Header = () => {
  const [todos] = useAtom(todosAtom);

  return (
    <header className="w-full  pt-2.5 pb-3 bg-zinc-900/30 backdrop-blur-md  fixed top-0 items-center z-10 flex justify-center">
      <div className="w-full desktop:max-w-[500px] flex justify-between px-4">
        <h1 className="text-3xl font-bold text-zinc-300 ">задачи</h1>
        <p className="text-zinc-300 text-3xl font-bold ">{todos.length}</p>
      </div>
    </header>
  );
};
