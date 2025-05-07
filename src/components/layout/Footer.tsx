'use client';

import { AddTodoButton } from '@/components/add-todo/AddTodoButton';

export const Footer = () => {
  return (
    <div className="bg-white/30 backdrop-blur-sm fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px]  ">
      <AddTodoButton />
    </div>
  );
};
