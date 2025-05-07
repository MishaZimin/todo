'use client';

import { useState } from 'react';

const getMacColor = (value: number): string => {
  if (value <= 3) return '#ff5f57';
  if (value <= 6) return '#febc2e';
  return '#28c840';
};

export const ProgressBar = ({
  progress,
  onChange,
}: {
  progress: number;
  onChange: (value: number) => void;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeIndex = hoverIndex !== null ? hoverIndex : progress - 1;
  const activeColor = activeIndex >= 0 ? getMacColor(activeIndex) : '#e5e7eb';

  return (
    <div className="flex h-10 w-full rounded-lg overflow-hidden bg-gray-200">
      {[...Array(10)].map((_, i) => {
        const shouldHighlight = i <= activeIndex;
        return (
          <div
            key={i}
            className="flex-1 border-r border-gray-100 last:border-r-0 transition-all duration-200"
            style={{
              backgroundColor: shouldHighlight ? activeColor : '#e5e7eb',
              opacity: hoverIndex !== null && i <= hoverIndex ? 0.9 : 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onChange(i + 1);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            aria-label={`Установить ${(i + 1) * 10}% выполнения`}
          />
        );
      })}
    </div>
  );
};
