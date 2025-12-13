import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ItaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/task-status.enums';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamp';
import { TaskStatus } from '../type/task-status';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // A fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  // Fazendo
  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.doingTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  // feitas
  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.doneTasks$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

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

  updateTaskStatus(
    taskId: string,
    taskCurentStatus: TaskStatus,
    nextStatus: TaskStatus
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurentStatus);
    const nextTaskList = this.getTaskListByStatus(nextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId
    );

    if (currentTask) {
      currentTask.status = nextStatus;

      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  private getTaskListByStatus(taskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };

    return taskListObj[taskStatus];
  }
}
