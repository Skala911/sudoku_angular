import { Component, Input } from '@angular/core';
import { SudokuCellGroup } from '../../types/sudoku-cell-group.model';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-cell-group',
  imports: [
    CellComponent
  ],
  templateUrl: './cell-group.component.html',
  styleUrl: './cell-group.component.scss'
})
export class CellGroupComponent {
  @Input({ required: true }) group!: SudokuCellGroup;
}
