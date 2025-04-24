import { GameConstants } from '../constants/game-constants';
import { SudokuCellModel } from './sudoku-cell.model';

export class SudokuCellGroup {
  rows: Array<Array<SudokuCellModel>> = [];

  constructor(hash: string) {
    this.init(hash);
  }

  private init(hash: string): void {
    this.rows = Array.from({length: GameConstants.BOX_SIZE}, () => Array.from({length: GameConstants.BOX_SIZE}, () => new SudokuCellModel(hash)));
  }
}
