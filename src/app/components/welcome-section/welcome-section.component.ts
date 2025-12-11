import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';
import { TaskService } from '../../services/task.service';
import { ItaskFormControls } from '../../interfaces/task-form-controls.interface';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css',
})
export class WelcomeSectionComponent {
  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openNewTaskModal() {
    const dialogRef = this._modalControllerService.openNewTaskModal();

    dialogRef.closed.subscribe((taskForm) => {
      console.log('criada', taskForm);
      if (taskForm) {
        this._taskService.addTask(taskForm);
        console.log(taskForm);
      }
    });
  }
}
