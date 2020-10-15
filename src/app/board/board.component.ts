import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ColumnService, BoardService } from '@app-services/services';
import { Board, Column } from 'app/core/model';
import { trackById } from 'app/core/utils/utils';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardId: string;
  columnId: string;
  columnTitle: string;
  isTouchedId = null;

  board$: Observable<Board>;
  boards$: Observable<Board[]>;
  columns$: Observable<Column[]>;

  trackById = trackById;

  @ViewChild('changedColumnTitle') changedColumnTitle: ElementRef;

  constructor(
    private columnService: ColumnService,
    private boardService: BoardService,
    private activatedRoute: ActivatedRoute,
  ) {}

  async addColumn(): Promise<void> {
    if (!this.columnTitle) { return; }
    await this.columnService.addColumn(this.boardId, this.columnTitle);
    this.clear();
  }

  clear(): string {
    return this.columnTitle = '';
  }

  async deleteColumn(columnId: string): Promise<void> {
    if (!columnId) { return; }
    await this.columnService.deleteColumn(columnId);
  }

  async updateColumn(columnId: string, title: string): Promise<void> {
    if (!columnId) { return; }
    await this.columnService.updateColumn(columnId, title);
    this.isTouchedId = null;
  }

  changeColumnTitle(columnId: string): void {
    this.isTouchedId = columnId;
    setTimeout(() => this.changedColumnTitle.nativeElement.focus());
  }

  ngOnInit(): void {
    this.columns$ = this.columnService.columns$;

    this.activatedRoute.params
    .pipe(
      map(params => params.boardId),
      distinctUntilChanged(),
    ).subscribe(boardId => {
      this.columnService.getColumns(boardId);
      this.boardId = boardId;
    });
  }
}
