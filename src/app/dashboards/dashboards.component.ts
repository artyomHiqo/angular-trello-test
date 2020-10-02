import { Component, OnInit } from '@angular/core';
import { BoardService } from '@app-services/board.service';
import { Observable } from 'rxjs';

import { Board } from 'app/core/model/board.model';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  board$: Observable<Board[]>;

  constructor(private boardService: BoardService) {
    this.getBoards();
  }

  async addBoard(boardTitle: string): Promise<void> {
    await this.boardService.addBoard(boardTitle);
    this.getBoards();
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }

  ngOnInit(): void {
    this.board$ = this.boardService.board$;
  }
}
