import { Component, inject } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/task.interface';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TaskStatus } from '../../type/task-status';
import { TaskStatusEnum } from '../../enums/task-status.enums';
@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDropList, CdkDrag, AsyncPipe, JsonPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent {
  readonly _taskService = inject(TaskService);

  onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardToolumn(event);

    const taskId = event.item.data.id;
    const taskCurentStatus = event.item.data.status;
    const droppedColumn = event.container.id;

    this.updateTaskStatus(taskId, taskCurentStatus, droppedColumn);
  }

  private updateTaskStatus(
    taskId: string,
    taskCurentStatus: TaskStatus,
    droppedColumn: string
  ) {
    let taskNextStatus: TaskStatus;

    switch (droppedColumn) {
      case 'to-do-column':
        taskNextStatus = TaskStatusEnum.TODO;
        break;
      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING;
        break;
      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE;
        break;
      default:
        throw Error('Coluna não identificada');
    }

    this._taskService.updateTaskStatus(
      taskId,
      taskCurentStatus,
      taskNextStatus
    );
  }

  private moveCardToolumn(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
