'use client';

import { addTodoAtom } from '@/shared/lib/store';
import { Button } from '@/shared/ui/button';
import { useSetAtom } from 'jotai';
import { Plus } from 'lucide-react';

export const AddTodoButton = () => {
  const addTodo = useSetAtom(addTodoAtom);

  const handleAdd = () => {
    addTodo('new');
  };

  return (
    <Button
      className="w-full h-[56px] rounded-0"
      variant={'ghost'}
      onClick={handleAdd}
      size="lg"
      aria-label="Добавить задачу"
    >
      <Plus size={80} />
    </Button>
  );
};
