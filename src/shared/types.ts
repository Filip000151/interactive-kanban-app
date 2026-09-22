export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status
  order: number;
};

export type Status = 'toDo' | 'inProgress' | 'done';

export type ModalType = string | null;

export type InputState = {
  titleInput: string;
  descriptionInput: string;
};

export type InputAction = {
  type: 'setTitle' | 'setDescription';
  value: string;
} | {
  type: 'clear';
} | {
  type: 'setInputs';
  value: InputState;
};

export type DropIndicator = {
  id: string;
  position: 'before' | 'after';
}