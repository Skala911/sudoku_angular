import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SudokuCellModel } from '../../types/sudoku-cell.model';

@Component({
  selector: 'app-cell',
  imports: [
    NgClass
  ],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  @Input({ required: true }) cell!: SudokuCellModel;
}
