'use client';

import { addTodoAtom } from '@/shared/lib/store';
import { Button } from '@/shared/ui/button';
import { useSetAtom } from 'jotai';
import { Plus } from 'lucide-react';

export const AddTodoButton = () => {
  const addTodo = useSetAtom(addTodoAtom);

  const handleAdd = () => {
    addTodo('');
  };

  return (
    <Button
      className="mx-auto bg-zinc-800/30 text-zinc-300 hover:bg-zinc-600/20 border border-zinc-700 backdrop-blur-md w-18 rounded-full text-2xl"
      variant={'ghost'}
      onClick={handleAdd}
      size="lg"
      aria-label="Добавить задачу"
    >
      <Plus className="min-h-6 min-w-6" />
    </Button>
  );
};
