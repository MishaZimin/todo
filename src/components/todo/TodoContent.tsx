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
  const wasEditing = useRef(false);

  useEffect(() => {
    if (isEditing && !wasEditing.current) {
      inputRef.current?.focus();
      wasEditing.current = true;
    } else if (!isEditing) {
      wasEditing.current = false;
    }
  }, [isEditing]);

  return (
    <div
      className={`relative bg-zinc-800 border border-zinc-700 rounded-[24px] p-1.5  ${
        isFrozen ? 'pointer-events-none bg-gray-50' : ''
      }`}
    >
      {isFrozen && (
        <div className="absolute inset-0 rounded-[24px] bg-zinc-700/90   pointer-events-none" />
      )}

      <div className="px-2 py-0.5 min-h-[32px] w-full" onClick={onClick}>
        <input
          ref={inputRef}
          disabled={isFrozen}
          value={editedText}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onTextCommit(e)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className={`w-full bg-transparent border-none outline-none text-zinc-300 font-medium text-lg ${
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
