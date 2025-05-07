'use client';

import { Button } from '@/shared/ui/button';
import { BaseModal } from '@/shared/ui/Modal';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TodoModal = ({ open, onOpenChange }: TodoModalProps) => {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} size="sm">
      <div>
        <div className="flex justify-between pt-4 gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Закрыть
          </Button>
          <Button
            type="submit"
            className="bg-[#0A0F1C] text-white hover:bg-[#1A1F2C] flex-1"
          >
            Создать
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
