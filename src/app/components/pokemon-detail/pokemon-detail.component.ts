import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { startWith } from 'rxjs';

import { AttackDetailComponent } from '../attack-detail.component';
import { EvolutionComponent } from "../evolution.component";
import { Move, PokemonDetails } from '../../types/pokemon.type';
import { PokemonService } from '../../services/pokemon.service';
import { AttackService } from '../../services/attack.service';
import { CapitalizePipe } from '../../utils/capitalize.pipe';
import { DecimalPointPipe } from '../../utils/decimal-point.pipe';

@Component({
  selector: 'app-pokemon-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CapitalizePipe,
    DecimalPointPipe,
    MatTooltipModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    EvolutionComponent,
    CapitalizePipe
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly _pokemonService = inject(PokemonService);
  private readonly _attackService = inject(AttackService);
  private readonly dialog = inject(MatDialog);

  protected readonly _selectedPokemon = signal<PokemonDetails | undefined>(undefined);
  protected readonly panelOpenState = signal(false);
  protected readonly isShiny = signal(false);
  protected readonly spriteStyleControl = new FormControl('default');
  private readonly spriteType = toSignal(
    this.spriteStyleControl.valueChanges.pipe(
      startWith(this.spriteStyleControl.value)
    )
  );
  protected readonly spriteSrc = computed(() =>
    this.changeSprite(this.spriteType() === 'default', this.isShiny())
  );
  protected readonly evolution = toSignal(this._pokemonService.pokemonEvolutions$);

  constructor() {
    this._pokemonService.selectedPokemonDetails$.subscribe(
      (pokemonDetails) => {
        this.spriteStyleControl.setValue('default');
        pokemonDetails.moves.sort((a, b) => a.move.name.localeCompare(b.move.name));
        this._selectedPokemon.set(pokemonDetails);
      }
    );
  }

  private changeSprite(isDefault: boolean, isShiny: boolean) {
    if (isDefault && !isShiny) {
      return this._selectedPokemon()!.sprites.front_default;
    }
    if (!isDefault && !isShiny) {
      return this._selectedPokemon()!.sprites.front_female;
    }
    if (isDefault && isShiny) {
      return this._selectedPokemon()!.sprites.front_shiny;
    }
    return this._selectedPokemon()!.sprites.front_shiny_female;
  }

  protected openAttackDetailsDialog(move: Move) {
    this._attackService.changeSelectedAttack(move.move.url);
    const dialogRef = this.dialog.open(AttackDetailComponent);


    dialogRef.afterClosed().subscribe(() => {
      this._attackService.clearSelectedAttack();
    });

  }
}