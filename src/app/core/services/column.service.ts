import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from '../model/column.model';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnService extends ApiService {
  _columns$ = new BehaviorSubject<Column[]>([]);

  public readonly columns$ = this._columns$.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  get columns(): Column[] {
    return this._columns$.getValue();
  }

  async getColumns(boardId: string): Promise<void> {
    if (!boardId) { return; }
    const { columns } = await this.get<Board>(`boards/${boardId}`);
    this._columns$.next(columns);
  }

  async addColumn(boardId: string, title: string): Promise<void> {
    this._columns$.next([...this.columns, {title} as Column]);
    await this.post(`columns/${boardId}`, {title});

    this.getColumns(boardId);
  }

  async updateColumn(columnId: string, newTitle: string): Promise<void> {
    await this.put(`columns/${columnId}`, { title: newTitle });
  }

  async deleteColumn(columnId: string): Promise<void> {
    await this.delete(`columns/${columnId}`);
    const columns = this._columns$.getValue();

    for (let i = 0; i < columns.length; i++) {
      if (columns[i]._id === columnId) {
        columns.splice(i, 1);
      }
    }
  }
}
