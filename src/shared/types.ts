export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status
  order: number;
};

export type Status = 'toDo' | 'inProgress' | 'done';

export type ModalType = 'addTask' | null;

export type InputState = {
  titleInput: string;
  descriptionInput: string;
};

export type InputAction = {
  type: 'setTitle' | 'setDescription';
  value: string;
}