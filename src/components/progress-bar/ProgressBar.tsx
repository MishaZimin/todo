'use client';

import React, { useMemo, useCallback, useState } from 'react';

const getMacColor = (value: number): string => {
  if (value <= 2) return '#ff5f57';
  if (value <= 6) return '#febc2e';
  return '#28c840';
};

const BAR_COUNT = 10;
const barArray = Array(BAR_COUNT).fill(null); // Вынесено за пределы компонента

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
    const activeColor = useMemo(
      () => (activeIndex >= 0 ? getMacColor(activeIndex) : '#e5e7eb'),
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
        className={`flex h-9 w-full rounded-full overflow-hidden bg-gray-200 ${
          disabled ? 'opacity-50' : ''
        }`}
        onMouseLeave={() => !disabled && setHoverIndex(null)}
      >
        {barArray.map((_, i) => {
          const shouldHighlight = i <= activeIndex;
          return (
            <div
              key={i}
              className={`flex-1 border-r h-9 border-gray-100 last:border-r-0 ${
                disabled ? 'pointer-events-none' : 'cursor-pointer'
              }`}
              style={{
                backgroundColor: shouldHighlight ? activeColor : '#e5e7eb',
                opacity: hoverIndex !== null && i <= hoverIndex ? 0.8 : 1,
              }}
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
