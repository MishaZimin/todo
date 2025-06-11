'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoCard } from './TodoCard';
import { Todo } from '@/shared/lib/types';

interface Props {
  todo: Todo;
}

export const SortableTodoCard = ({ todo }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoCard todo={todo} />
    </div>
  );
};
