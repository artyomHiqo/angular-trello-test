import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  private _board$ = new BehaviorSubject<Board[]>([]);

  public readonly board$ = this._board$.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  get boards(): Board[] {
    return this._board$.getValue();
  }

  async sendBoardsRequest(): Promise<void> {
    const { boards } = await this.get<{ boards: Board[] }>('boards');
    console.log(boards);
    this._board$.next(boards);
  }

  async addBoard(title: string): Promise<void> {
    this._board$.next([...this.boards, { title } as Board]);
    await this.post('boards', { title });
  }

  async deleteBoard(boardId): Promise<void> {
    await this.delete(`boards/${boardId}`);
  }
}
