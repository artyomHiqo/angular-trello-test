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
  boards$: Observable<Board[]>;
  boardTitle: string;
  isTouched = true;

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
      this.singleForm.reset();
      await this.boardService.addBoard(boardTitle);
      this.getBoards();
      return;
    }
    this.notificationsService.openSnackBar('please give correct name to your board', 'close');
  }

  changeBoardTitle(): void {
    this.isTouched = false;
  }

  async updateBoard(boardId: string, boardTitle: string): Promise<void> {
    await this.boardService.updateBoard(boardId, boardTitle);
    this.isTouched = true;
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.boardService.deleteBoard(boardId);
    this.getBoards();
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }

  initForm(): void {
    this.singleForm = this.form.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.boards$ = this.boardService._boards$;
    this.initForm();
  }
}
