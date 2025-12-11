import { TaskStatusEnum } from '../enums/task-status.enums';

export type TaskStatus =
  | TaskStatusEnum.TODO
  | TaskStatusEnum.DOING
  | TaskStatusEnum.DONE;
