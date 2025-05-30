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
      className="w-full h-[56px] rounded-0"
      variant={'ghost'}
      onClick={handleAdd}
      size="lg"
      aria-label="Добавить задачу"
    >
      <Plus className="min-h-5 min-w-5" />
    </Button>
  );
};
