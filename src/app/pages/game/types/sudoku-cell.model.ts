export class SudokuCellModel {
  value?: number;
  error: boolean = false;
  zoom: boolean = false;
  shake: boolean = false;
  selected: boolean = false;
  highlighted: boolean = false;
  row?: number;
  col?: number;
  filled: boolean = false;
  editable: boolean = false;
  groupHash: string;

  constructor(groupHash: string) {
    this.groupHash = groupHash;
  }
}
