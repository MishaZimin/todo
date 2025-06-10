'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { TodoCard } from '@/components/todo/TodoCard';
import { todosAtom } from '@/shared/lib/store';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { memo, useCallback } from 'react';

export const TodoList = memo(() => {
  const todos = useAtomValue(todosAtom);
  const setTodos = useSetAtom(todosAtom);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8, ignore: '[data-no-drag]' },
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
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
    },
    [setTodos],
  );

  return (
    <div className="space-y-2 px-0 pb-24.5 pt-[68px]">
      {todos.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex justify-start items-center font-h-full text-center text-gray-500 pl-4">
          пусто
        </div>
      )}
    </div>
  );
});

TodoList.displayName = 'TodoList';
