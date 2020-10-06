import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  [x: string]: any;
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
  }

  async updateBoard(boardId: string, newTitle: string): Promise<void> {
    await this.put(`boards/${boardId}`, newTitle);
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.delete(`boards/${boardId}`);
  }
}
