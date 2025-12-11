import { TaskStatus } from '../type/task-status';
import { IComment } from './comment.interface';

export interface ITask {
  id: string;
  name: string;
  description: string;
  comments: IComment[];
  status: TaskStatus;
}
