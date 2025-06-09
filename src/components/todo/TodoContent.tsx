/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import { ProgressBar } from '../progress-bar/ProgressBar';

type TodoContentProps = {
  text: string;
  progress: number;
  isFrozen: boolean | undefined;
  isEditing: boolean;
  editedText: string;
  onClick: (() => void) | ((e: any) => void);
  onTextChange: (value: string) => void;
  onTextCommit: (e: React.FocusEvent | React.KeyboardEvent) => void;
  onProgressChange: (value: number) => void;
};

export const TodoContent = ({
  text,
  progress,
  isFrozen,
  isEditing,
  editedText,
  onClick,
  onTextChange,
  onTextCommit,
  onProgressChange,
}: TodoContentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      onTextChange(text);
    }
  }, [isEditing]);

  return (
    <div
      className={`relative bg-gray-100 border border-gray-200 rounded-[24px] p-1.5 transition-all duration-300 ${
        isFrozen ? 'pointer-events-none bg-gray-50' : ''
      }`}
    >
      {isFrozen && (
        <div className="absolute inset-0 rounded-[24px] bg-gray-100/80  pointer-events-none" />
      )}

      <div className="px-2 py-0.5 min-h-[32px] w-full" onClick={onClick}>
        <input
          ref={inputRef}
          disabled={isFrozen}
          value={editedText}
          onChange={(e) => onTextChange(e.target.value)}
          onBlur={onTextCommit}
          onKeyDown={(e) => e.key === 'Enter' && onTextCommit(e)}
          className={`w-full bg-transparent border-none outline-none text-gray-800 font-medium text-lg ${
            isEditing ? 'cursor-text' : 'cursor-pointer'
          }`}
          onClick={(e) => {
            if (!isEditing) onClick(e);
          }}
        />
      </div>

      <div className="mt-1">
        <ProgressBar
          progress={progress}
          onChange={onProgressChange}
          disabled={isFrozen}
        />
      </div>
    </div>
  );
};
