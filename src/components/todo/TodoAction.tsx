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
}: TodoActionsProps) => {
  if (!swiped) return null;

  return (
    <div className="absolute right-0 flex flex-row gap-2 mr-2 desktop:mr-[202px]">
      <button
        onClick={onFreeze}
        aria-label={isFrozen ? 'Разморозить задачу' : 'Заморозить задачу'}
        className=" cursor-pointer h-21.5 w-21.5 border-1 border-zinc-700 rounded-[24px] bg-zinc-800 hover:bg-zinc-700/70 flex items-center justify-center"
      >
        <Snowflake
          size={20}
          className={`text-blue-500 ${isFrozen ? 'fill-white' : ''}`}
        />
      </button>
      <button
        onClick={onDelete}
        aria-label="Удалить задачу"
        className=" cursor-pointer h-21.5 w-21.5 border-1 border-zinc-700 rounded-[24px] bg-zinc-800 hover:bg-zinc-700/70 flex items-center justify-center"
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  );
};
