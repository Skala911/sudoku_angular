import { Component, inject, OnInit } from '@angular/core';
import { CellGroupComponent } from './components/cell-group/cell-group.component';
import { GameComponentService } from './services/game-component.service';
import { GamePageModel } from './types/game-page.model';

@Component({
  selector: 'app-game',
  imports: [
    CellGroupComponent
  ],
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  m: GamePageModel = new GamePageModel();

  private readonly gameComponentService = inject(GameComponentService)

  ngOnInit(): void {
    this.m.init();
    this.m.generateSolvedGrid();
    this.m.maskCellsByPercentage(60);
  }
  insertNumber(num: number): void {
    this.gameComponentService.insertNumber(num, );
  }
}
