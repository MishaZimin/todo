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
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div
      className={`relative bg-gray-100 rounded-[16px] p-1.5 transition-transform duration-300 ${
        isFrozen ? 'pointer-events-none' : ''
      }`}
    >
      {isFrozen && (
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{
            background: `
      radial-gradient(circle at center, #e0f2fe 0%, #7dd3fc 100%),
      linear-gradient(to bottom, #7dd3fc 0%, transparent 50%, #7dd3fc 100%)
    `,
            opacity: 0.4,
            backgroundBlendMode: 'soft-light',
          }}
        />
      )}

      <div
        className="px-2 py-0.5 min-h-[32px] w-[calc(100%_-_50px)]"
        onClick={onClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={editedText}
            onChange={(e) => onTextChange(e.target.value)}
            onBlur={onTextCommit}
            onKeyDown={onTextCommit}
            className="w-full bg-transparent border-none outline-none text-gray-800 font-medium text-lg"
          />
        ) : (
          <p className="text-gray-800 font-medium break-words text-lg">
            {text}
          </p>
        )}
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
