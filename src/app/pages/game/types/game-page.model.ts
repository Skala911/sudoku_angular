import { GameConstants } from '../constants/game-constants';
import { SudokuCellGroup } from './sudoku-cell-group.model';
import { SudokuCellModel } from './sudoku-cell.model';

export class GamePageModel {
  cellGroups: Array<Array<SudokuCellGroup>> = [];
  toolbar: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  allCells: SudokuCellModel[] = [];

  init(): void {
    this.cellGroups = Array.from(
      { length: GameConstants.BOX_SIZE },
      () => Array.from(
        { length: GameConstants.BOX_SIZE },
        () => new SudokuCellGroup()
      )
    );
  }

  generateSolvedGrid(): void {
    const grid: number[][] = this.createEmptyGrid();
    this.fillGrid(grid);

    this.init();

    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const group = this.cellGroups[boxRow][boxCol];

        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const globalRow = boxRow * 3 + r;
            const globalCol = boxCol * 3 + c;
            const value = grid[globalRow][globalCol];

            const cell = group.rows[r][c];
            cell.value = value;
            cell.row = globalRow;
            cell.col = globalCol;
            cell.filled = true;
            this.allCells.push(cell);
          }
        }
      }
    }
  }

  maskCellsByPercentage(percentage: number): void {
    if (percentage < 1 || percentage > 100) {
      throw new Error('Percentage must be between 1 and 100');
    }

    const totalCells = 81;
    const cellsToClear = Math.floor((percentage / 100) * totalCells);

    const allCells: SudokuCellModel[] = [];

    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const group = this.cellGroups[boxRow][boxCol];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            allCells.push(group.rows[r][c]
            );
          }
        }
      }
    }

    const shuffled = this.shuffle(allCells);
    for (let i = 0; i < cellsToClear; i++) {
      shuffled[i].value = undefined;
      shuffled[i].filled = false;
    }
  }

  private createEmptyGrid(): number[][] {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  private isSafe(grid: number[][], row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[startRow + r][startCol + c] === num) return false;
      }
    }

    return true;
  }

  private shuffle<T>(arr: T[]): T[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private fillGrid(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (const num of numbers) {
            if (this.isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              if (this.fillGrid(grid)) return true;
              grid[row][col] = 0;
            }
          }

          return false;
        }
      }
    }

    return true;
  }

}
