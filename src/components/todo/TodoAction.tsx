import { Snowflake, Trash2 } from 'lucide-react';

type TodoActionsProps = {
  swiped: boolean;
  isFrozen: boolean | undefined;
  onDelete: () => void;
  onFreeze: () => void;
};

export const TodoActions = ({
  swiped,
  isFrozen,
  onDelete,
  onFreeze,
}: TodoActionsProps) => (
  <>
    <button
      onClick={onFreeze}
      aria-label={isFrozen ? 'Разморозить задачу' : 'Заморозить задачу'}
      className={`absolute top-0 right-[92px] h-full w-22 rounded-[16px] bg-blue-500/90 hover:bg-blue-500/80 flex items-center justify-center transition-transform duration-300 ${
        swiped ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Snowflake
        size={20}
        className={`text-white ${isFrozen ? 'fill-white' : ''}`}
      />
    </button>

    <button
      onClick={onDelete}
      aria-label="Удалить задачу"
      className={`absolute top-0 right-0 h-full w-22 rounded-[16px] bg-red-500/90 hover:bg-red-500/80 flex items-center justify-center transition-transform duration-300 ${
        swiped ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Trash2 size={20} className="text-white" />
    </button>
  </>
);
