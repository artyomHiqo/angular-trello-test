import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '@app-services/board.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Board } from 'app/core/model/board.model';
import { SpinnerService } from '@app-services/spinner.service';
import { trackById } from 'app/core/utils/track-by';
import { NotificationsService } from '@app-services/notifications.service';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {

  singleForm: FormGroup;
  showSpinner$: Observable<boolean>;
  boards$: Observable<Board[]>;
  boardId: string;
  boardTitle: string;
  isTouchedId = null;

  watcher: Subscription;
  activeMediaQuery = '';
  columns = 4;

  trackById = trackById;
  @ViewChild('changedBoardTitle') changedBoardTitle: ElementRef;

  constructor(
    private boardService: BoardService,
    private spinner: SpinnerService,
    private form: FormBuilder,
    private notificationsService: NotificationsService,
    private mediaObserver: MediaObserver,
    private router: Router,
  ) {
    this.getBoards();
    this.showSpinner$ = spinner.getValue();
    this.watcher = mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.columns = 1;
        } else if (change.mqAlias === 'sm') {
          this.columns = 2;
        } else {
          this.columns = 4;
        }
      });
  }

  async addBoard(boardTitle: string): Promise<void> {
    if (this.singleForm.valid) {
      this.singleForm.reset();
      await this.boardService.addBoard(boardTitle);
      return;
    }
    this.notificationsService.openSnackBar('please give correct name to your board', 'close');
  }

  changeBoardTitle(boardId: any): void {
    this.isTouchedId = boardId;
    setTimeout(() => this.changedBoardTitle.nativeElement.focus());
  }

  async updateBoard(boardId: string, boardTitle: string): Promise<void> {
    await this.boardService.updateBoard(boardId, boardTitle);
    this.isTouchedId = null;
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.boardService.deleteBoard(boardId);
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }

  openBoard(boardId: string): void {
    if (!boardId) { return; }
    this.router.navigate([`/boards/${boardId}`]);
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

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}
