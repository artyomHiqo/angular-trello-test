import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  _boards$ = new BehaviorSubject<Board[]>([]);

  public readonly board$ = this._boards$.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  get boards(): Board[] {
    return this._boards$.getValue();
  }

  async sendBoardsRequest(): Promise<void> {
    const { boards } = await this.get<{ boards: Board[] }>('boards');
    this._boards$.next(boards);
  }

  async addBoard(title: string): Promise<void> {
    this._boards$.next([...this.boards, { title } as Board]);
    await this.post('boards', { title });

    // this.sendBoardsRequest();
  }

  async updateBoard(boardId: string, newTitle: string): Promise<void> {
    await this.put(`boards/${boardId}`, { title: newTitle });
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.delete(`boards/${boardId}`);
    const boards = this._boards$.getValue();

    for (let i = 0; i < boards.length; i++) {
      if (boards[i]._id === boardId) {
        boards.splice(i, 1);
      }
    }
  }
}
