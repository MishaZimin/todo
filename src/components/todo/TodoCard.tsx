'use client';

import { memo } from 'react';
import { useState, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useSwipeable } from 'react-swipeable';
import { Todo } from '@/shared/lib/types';
import { deleteTodoAtom, updateTodoAtom } from '@/shared/lib/store';
import { TodoContent } from './TodoContent';
import { TodoActions } from './TodoAction';

type TodoCardProps = {
  todo: Todo;
  className?: string;
};

export const TodoCard = memo(({ todo, className = '' }: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [swiped, setSwiped] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const updateTodo = useSetAtom(updateTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => deleteTodo(todo.id), 300);
  };

  const handleFreeze = () => {
    updateTodo({ ...todo, isFrozen: !todo.isFrozen });
    setSwiped(false);
  };

  const handleTextChange = (value: string) => {
    setEditedText(value);
    updateTodo({ ...todo, text: value });
  };

  const handleCommitEdit = (e: React.FocusEvent | React.KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    const trimmed = editedText.trim();
    if (trimmed && trimmed !== todo.text) {
      updateTodo({ ...todo, text: trimmed });
    }
    setIsEditing(false);
  };

  const handleProgressChange = (value: number) => {
    updateTodo({ ...todo, progress: value });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setSwiped(true),
    onSwipedRight: () => setSwiped(false),
    trackMouse: true,
    delta: 50,
  });

  return (
    <div
      {...handlers}
      className={`  relative overflow-hidden desktop:min-w-[892px] desktop:max-w-[892px]  w-full transition-transform duration-300 ease-in-out  flex justify-center ${className} ${
        isExiting
          ? 'opacity-0 scale-95 -translate-x-2'
          : isMounted
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 translate-y-2'
      }`}
    >
      <TodoActions
        swiped={swiped}
        isFrozen={todo.isFrozen}
        onDelete={handleDelete}
        onFreeze={handleFreeze}
      />

      <div
        className={`px-2 transition-transform duration-300 desktop:w-[504px]  w-full ${
          swiped ? '-translate-x-[188px]' : '-translate-x-[-0px]'
        }`}
      >
        <TodoContent
          text={todo.text}
          progress={todo.progress}
          isFrozen={todo.isFrozen}
          isEditing={isEditing}
          editedText={editedText}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          onTextChange={handleTextChange}
          onTextCommit={handleCommitEdit}
          onProgressChange={handleProgressChange}
        />
      </div>
    </div>
  );
});

TodoCard.displayName = 'TodoCard';
