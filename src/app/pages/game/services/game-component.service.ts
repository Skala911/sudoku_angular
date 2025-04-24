import { Injectable } from '@angular/core';
import {SudokuCellModel} from '../types/sudoku-cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameComponentService {
  private selectedCell?: SudokuCellModel;

  selectCell(cell: SudokuCellModel , allCells: SudokuCellModel[]): void {
    if(this.selectedCell) this.selectedCell.selected = false;

    this.selectedCell = cell;
    this.selectedCell.selected = true;

    this.highlightRowColumn(cell, allCells);
    // this.validateRowColumnAndBox(this.selectedCell, allCells);
  }

  insertNumber(num: number, allCells: SudokuCellModel[]): void {
    if (!this.selectedCell || !this.selectedCell.editable) return;

    if (num === 0) {
      this.selectedCell.value = undefined;
      this.selectedCell.zoom = false;
      this.selectedCell.error = false;
      this.removeValidationRowColumnAndBox(this.selectedCell, allCells);
      return;
    }

    this.selectedCell.value = num;
    this.selectedCell.zoom = true;

    this.validateRowColumnAndBox(this.selectedCell, allCells);

    setTimeout(() => (this.selectedCell && (this.selectedCell!.zoom = false)), 500);
  }

  private highlightRowColumn(cell: SudokuCellModel, allCells: SudokuCellModel[]): void {
    allCells.forEach(targetCell => (targetCell.highlighted = (targetCell.row === cell.row || targetCell.col === cell.col || targetCell.groupHash === cell.groupHash) && targetCell !== cell));
  }

  private validateRowColumnAndBox(cell: SudokuCellModel, allCells: SudokuCellModel[]): void {
    allCells.forEach(targetCell => {
      const prevTargetCellError = targetCell.error;

      if ((targetCell.row === cell.row || targetCell.col === cell.col || targetCell.groupHash === cell.groupHash) && targetCell !== cell && (cell.value || targetCell.value)) {
        targetCell.error = targetCell.value === cell.value;
        cell.error = (targetCell.value === cell.value) || cell.error;

        if (prevTargetCellError && !targetCell.error) this.validateRowColumnAndBox(targetCell, allCells);
      }
    });
  }

  private removeValidationRowColumnAndBox(cell: SudokuCellModel, allCells: SudokuCellModel[]): void {
    allCells.forEach(targetCell => {
      if ((targetCell.row === cell.row || targetCell.col === cell.col || targetCell.groupHash === cell.groupHash) && targetCell !== cell) {
        if (targetCell.error) setTimeout(() => this.validateRowColumnAndBox(targetCell, allCells));

        targetCell.error = false;
        cell.error = false;
      }
    });
  }

}
