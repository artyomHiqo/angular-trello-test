import { Component, OnInit } from '@angular/core';
import { BoardService } from '@app-services/board.service';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Board } from 'app/core/model/board.model';
import { SpinnerService } from '@app-services/spinner.service';
import { trackById } from 'app/core/utils/track-by';
import { NotificationsService } from '@app-services/notifications.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  singleForm: FormGroup;
  showSpinner$: Observable<boolean>;
  board$: Observable<Board[]>;
  trackById = trackById;

  constructor(
    private boardService: BoardService,
    private spinner: SpinnerService,
    private form: FormBuilder,
    private notificationsService: NotificationsService,
  ) {
    this.getBoards();
    this.showSpinner$ = spinner.getValue();
  }

  async addBoard(boardTitle: string): Promise<void> {
    if (this.singleForm.valid) {
      await this.boardService.addBoard(boardTitle);
      this.getBoards();
    }
    this.notificationsService.openSnackBar('please give a name to your board', 'close');
  }

  async deleteBoard(boardId): Promise<void> {
    await this.boardService.deleteBoard(boardId);
    this.getBoards();
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }

  isValid(controlName: string): boolean {
    const control = this.singleForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  initForm(): void {
    this.singleForm = this.form.group({
      title: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }

  ngOnInit(): void {
    this.board$ = this.boardService.board$;
    this.initForm();
  }
}
