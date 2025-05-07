'use client';

import { Dialog, DialogContent } from '@/shared/ui/dialog';

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'xl';
}

export const BaseModal = ({
  open,
  onOpenChange,
  children,
  size = 'md',
}: BaseModalProps) => {
  const sizeClasses = {
    sm: '!max-w-[384px]',
    md: '!max-w-[600px]',
    xl: '!max-w-[800px]',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`reltive p-6 rounded-[5px] ${sizeClasses[size]}`}
      >
        {/* <button
          onClick={() => onOpenChange(false)}
          className="absolute right-[-50px] w-10 h-10 rounded-full bg-white flex justify-center items-center border-1 border-slate-200"
        >
          <span className="sr-only">Закрыть</span>
        </button> */}
        {children}
      </DialogContent>
    </Dialog>
  );
};
