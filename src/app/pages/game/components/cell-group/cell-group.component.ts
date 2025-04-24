import {Component, Input, model} from '@angular/core';
import { SudokuCellGroup } from '../../types/sudoku-cell-group.model';
import { CellComponent } from '../cell/cell.component';
import {GamePageModel} from '../../types/game-page.model';

@Component({
  selector: 'app-cell-group',
  imports: [
    CellComponent
  ],
  templateUrl: './cell-group.component.html',
  standalone: true,
  styleUrl: './cell-group.component.scss'
})
export class CellGroupComponent {
  @Input({ required: true }) group!: SudokuCellGroup;
  @Input({ required: true }) model!: GamePageModel;
/*
  protected readonly model = model;
*/
}
