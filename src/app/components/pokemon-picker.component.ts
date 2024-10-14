import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';

import { InfiniteScroller } from "../utils/infinite-scroller";
import { CapitalizePipe } from "../utils/capitalize.pipe";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../types/pokemon.type";

@Component({
  selector: 'app-pokemon-picker',
  standalone: true,
  imports: [ScrollingModule, MatButtonModule, CapitalizePipe],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let pokemon of dataSource; let index = index;" class="item" [class.selected]="this.selectedPokemon()?.name == pokemon?.name" (click)="selectPokemon(pokemon)">
        <span>#{{ (index + 1).toString().padStart(4, '0') }} {{ (pokemon?.name | capitalize)  || 'lade...' }}</span>
      </div>
    </cdk-virtual-scroll-viewport>
    `,
  styles: `
  @import '../../styles/_variables';

  :host {
    width: 200px;
    height: 100%;
    max-height: 500px;
  }
      .viewport {
        height: 100%;
        width: 100%;
        border: 1px solid black;
        box-sizing: border-box;
      }
      
      .item {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 0 0 10px;
        cursor: pointer;

        &:hover, &.selected {
          background-color: $blue-primary;
          color: white;
        }
      }
    `
})
export class PokemonPickerComponent {
  private readonly _pokemonService = inject(PokemonService);
  protected dataSource: InfiniteScroller<Pokemon>;
  protected selectedPokemon = toSignal(this._pokemonService.selectedPokemon$);

  constructor() {
    this.dataSource = new InfiniteScroller<Pokemon>("https://pokeapi.co/api/v2/pokemon");
  }

  protected selectPokemon(pokemon: Pokemon) {
    this._pokemonService.selectedPokemon = pokemon;
  }
}
