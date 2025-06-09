'use client';

import { useAtom } from 'jotai';
import { TodoCard } from '@/components/todo/TodoCard';
import { todosAtom } from '@/shared/lib/store';
import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Todo } from '@/shared/lib/types';

export const TodoList = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        ignore: '[data-no-drag]',
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems;
      });
    }
  };

  return (
    <div className="space-y-2 px-0 pb-24.5 pt-[68px]">
      {isClient ? (
        todos.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
              {todos.map((todo) => (
                <SortableTodoCard key={todo.id} todo={todo} id={todo.id} />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex justify-start items-center font-h-full text-center text-gray-500 pl-4">
            пусто
          </div>
        )
      ) : null}
    </div>
  );
};

const SortableTodoCard = ({ todo, id }: { todo: Todo; id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
    zIndex: isDragging ? 100 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2"
    >
      <TodoCard todo={todo} className="bg-white" />
    </div>
  );
};
