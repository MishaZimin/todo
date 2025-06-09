'use client';

import { AddTodoButton } from '@/components/add-todo/AddTodoButton';

export const Footer = () => {
  return (
    <div className="bg-none rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-16 mb-2 flex justify-center text-black font-extrabold">
      <AddTodoButton />
    </div>
  );
};
