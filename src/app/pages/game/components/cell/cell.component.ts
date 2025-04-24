import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SudokuCellModel } from '../../types/sudoku-cell.model';
import {GameComponentService} from '../../services/game-component.service';

@Component({
  selector: 'app-cell',
  imports: [
    NgClass
  ],
  templateUrl: './cell.component.html',
  standalone: true,
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  @Input({ required: true }) cell!: SudokuCellModel;
  @Input({ required: true }) allCells!: SudokuCellModel[];
  constructor(private gameService : GameComponentService) {
  }
  select():void {
    this.gameService.selectCell(this.cell, this.allCells)
  }
}
