'use client';

import { useState } from 'react';

const getMacColor = (value: number): string => {
  if (value <= 2) return '#ff5f57';
  if (value <= 6) return '#febc2e';
  return '#28c840';
};

export const ProgressBar = ({
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
  const activeColor = activeIndex >= 0 ? getMacColor(activeIndex) : '#e5e7eb';

  return (
    <div
      className={`flex h-9 w-full rounded-full overflow-hidden bg-gray-200 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {[...Array(10)].map((_, i) => {
        const shouldHighlight = i <= activeIndex;
        return (
          <div
            key={i}
            className={`flex-1 border-r h-9 backdrop-blur-md border-gray-100 last:border-r-0 transition-all duration-200 ${
              disabled ? 'pointer-events-none' : ''
            }`}
            style={{
              backgroundColor: shouldHighlight ? activeColor : '#e5e7eb',
              opacity: hoverIndex !== null && i <= hoverIndex ? 0.8 : 1,
            }}
            onClick={(e) => {
              if (disabled) return;
              e.stopPropagation();
              onChange(i + 1);
            }}
            onTouchStart={(e) => {
              if (disabled) return;
              e.stopPropagation();
            }}
            onMouseEnter={() => !disabled && setHoverIndex(i)}
            onMouseLeave={() => !disabled && setHoverIndex(null)}
            aria-label={`Установить ${(i + 1) * 10}% выполнения`}
            aria-disabled={disabled}
          />
        );
      })}
    </div>
  );
};
