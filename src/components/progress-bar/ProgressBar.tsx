'use client';

import React, { useMemo, useCallback, useState } from 'react';

const getMacTailwindColor = (value: number): string => {
  if (value <= 2) return 'bg-red-500';
  if (value <= 6) return 'bg-amber-400';
  return 'bg-green-500';
};

const BAR_COUNT = 10;
const barArray = Array(BAR_COUNT).fill(null);

export const ProgressBar = React.memo(
  ({
    progress,
    onChange,
    disabled = false,
  }: {
    progress: number;
    onChange: (value: number) => void;
    disabled?: boolean;
  }) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const activeIndex = hoverIndex !== null ? hoverIndex : progress - 1;
    const activeColorClass = useMemo(
      () =>
        activeIndex >= 0 ? getMacTailwindColor(activeIndex) : 'bg-zinc-800',
      [activeIndex],
    );

    const handleClick = useCallback(
      (i: number) => (e: React.MouseEvent) => {
        if (disabled) return;
        e.stopPropagation();
        onChange(i + 1);
      },
      [disabled, onChange],
    );

    const handleMouseEnter = useCallback(
      (i: number) => () => {
        if (!disabled) setHoverIndex(i);
      },
      [disabled],
    );

    return (
      <div
        className={`flex h-9 w-full rounded-full overflow-hidden bg-zinc-900 ${
          disabled ? 'opacity-50' : ''
        }`}
        onMouseLeave={() => !disabled && setHoverIndex(null)}
      >
        {barArray.map((_, i) => {
          const isActive = i <= activeIndex;
          const isHovered = hoverIndex !== null && i <= hoverIndex;

          return (
            <div
              key={i}
              className={`
                flex-1 h-9 last:border-r-0 border-r border-zinc-800
                ${isActive ? activeColorClass : 'bg-zinc-800/40'}
                ${isHovered ? 'opacity-80' : ''}
                ${disabled ? 'pointer-events-none' : 'cursor-pointer'}
                transition-opacity duration-200
              `}
              onClick={handleClick(i)}
              onMouseEnter={handleMouseEnter(i)}
              aria-label={`Установить ${(i + 1) * 10}% выполнения`}
              aria-disabled={disabled}
            />
          );
        })}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
