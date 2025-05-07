'use client';

import { useState, useRef, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useSwipeable } from 'react-swipeable';
import { Trash2 } from 'lucide-react';
import { Todo } from '@/shared/lib/types';
import { deleteTodoAtom, updateTodoAtom } from '@/shared/lib/store';
import { ProgressBar } from '../progress-bar/ProgressBar';

export const TodoCard = ({
  todo,
  className = '',
}: {
  todo: Todo;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [swiped, setSwiped] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateTodo = useSetAtom(updateTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);

  const handlers = useSwipeable({
    onSwipedLeft: () => setSwiped(true),
    onSwipedRight: () => setSwiped(false),
    trackMouse: true,
    delta: 50,
  });

  const handleProgressChange = (newProgress: number) => {
    updateTodo({ ...todo, progress: newProgress });
  };

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => deleteTodo(todo.id), 300);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrKeyDown = (e: React.FocusEvent | React.KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter') return;

    if (editedText.trim() !== todo.text) {
      updateTodo({ ...todo, text: editedText.trim() });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setIsMounted(true);
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      {...handlers}
      className={`relative overflow-hidden transition-all duration-300 ease-in-out transform ${
        isExiting
          ? 'opacity-0 scale-95 -translate-x-2'
          : isMounted
          ? 'opacity-100 scale-100 translate-x-0'
          : 'opacity-0 scale-95 translate-y-2'
      } ${className}`}
    >
      <button
        onClick={handleDelete}
        aria-label="Удалить задачу"
        className={`absolute top-0 right-0 h-full w-20 rounded-xl bg-red-500 flex items-center justify-center transition-transform duration-300 ${
          swiped ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="text-white p-2">
          <Trash2 size={20} />
        </div>
      </button>

      <div
        className={`bg-gray-100 rounded-xl p-1.5 transition-transform duration-300 ${
          swiped ? '-translate-x-20' : 'translate-x-0'
        }`}
        onClick={handleClick}
      >
        <div className="px-2.5 py-0.5 min-h-[32px]">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleBlurOrKeyDown}
              onKeyDown={handleBlurOrKeyDown}
              className="w-full bg-transparent border-none outline-none p-0 m-0 text-gray-800 font-medium text-lg"
            />
          ) : (
            <p className="text-gray-800 font-medium break-words text-lg">
              {todo.text}
            </p>
          )}
        </div>

        <div className="mt-1">
          <ProgressBar
            progress={todo.progress}
            onChange={handleProgressChange}
          />
        </div>
      </div>
    </div>
  );
};
