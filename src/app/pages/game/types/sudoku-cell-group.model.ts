import { GameConstants } from '../constants/game-constants';
import { SudokuCellModel } from './sudoku-cell.model';

export class SudokuCellGroup {
  rows: Array<Array<SudokuCellModel>> = [];

  constructor() {
    this.init();
  }

  private  init(): void {
    this.rows = Array.from({length: GameConstants.BOX_SIZE}, () => Array.from({length: GameConstants.BOX_SIZE}, () => new SudokuCellModel()));
  }
}
