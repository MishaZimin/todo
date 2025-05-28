export type Todo = {
  id: string;
  text: string;
  progress: number;
  isFrozen?: boolean;
  isArchived?: boolean;
};
