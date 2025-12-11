import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ItaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/task-status.enums';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamp';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // A fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$.asObservable();

  // Fazendo
  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.doingTasks$.asObservable();

  // feitas
  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.doneTasks$.asObservable();

  addTask(taskInfo: any) {
    const newTask: ITask = {
      ...taskInfo,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };
    const currentList = this.todoTasks$.value;

    this.todoTasks$.next([...currentList, newTask]);
  }
}
