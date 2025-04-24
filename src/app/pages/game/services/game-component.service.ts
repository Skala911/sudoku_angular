import { Injectable } from '@angular/core';
import {SudokuCellModel} from '../types/sudoku-cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameComponentService {
private selectedCell?: SudokuCellModel;



  selectCell(cell: SudokuCellModel , allCells: SudokuCellModel[]): void {
    if(this.selectedCell) {
      this.selectedCell.selected = false;
    }
    this.selectedCell = cell;
    console.log(this.selectedCell)
    this.selectedCell.selected = true;

    this.highlightRowColumn(cell, allCells);
  }

  highlightRowColumn(cell: SudokuCellModel, allCells: SudokuCellModel[]): void {
  allCells.forEach(c => {
    c.highlighted = false;
  })
    allCells.forEach(c => {
      if((c.row === cell.row || c.col === cell.col)&& c !== cell) {
        c.highlighted = true
      }
    })
  }

  insertNumber(num: number, ): void {
    if (!this.selectedCell || this.selectedCell.filled) {
      return;
    }

    if (num === 0) {
      this.selectedCell.value = undefined;
      this.selectedCell.zoom = false;
      this.selectedCell.error = false;
      return;
    }
    this.selectedCell.value = num;
    this.selectedCell.zoom = true;

  }

}
