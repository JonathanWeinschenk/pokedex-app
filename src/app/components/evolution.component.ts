import { Component, computed, input } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { Evolution } from "../types/pokemon.type";
import { CapitalizePipe } from "../utils/capitalize.pipe";

@Component({
    selector: 'app-evolution',
    standalone: true,
    imports: [CapitalizePipe, MatIconModule],
    template: `
    <div class="evolution">
        <span>{{ this.determineEvolutionStage() }}</span>
        <span class="pokemon">{{ (this.evolution().species.name | capitalize) }}</span>
    </div>
    @if(this.evolution().evolves_to.length > 0){
        <div class="icon-container"><mat-icon fontIcon="arrow_downward" /></div>
        <app-evolution [evolution]="this.evolution().evolves_to[0]" [selectedPokemonName]="this.selectedPokemonName()" [isBeforeCurrentStage]="this.determineIfBeforeCurrentStage()" />
    }
    `,
    styles: `
    .evolution {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .pokemon {
        font-weight: bold;
    }
    .icon-container {
        display: flex;
        justify-content: center;
    }
    `
})
export class EvolutionComponent {
    readonly evolution = input.required<Evolution>();
    readonly selectedPokemonName = input.required<string>();
    readonly isBeforeCurrentStage = input<boolean>(true);
    protected readonly determineIfBeforeCurrentStage = computed(() => this.isBeforeCurrentStage() && this.selectedPokemonName() !== this.evolution().species.name);

    determineEvolutionStage() {
        if (this.selectedPokemonName() === this.evolution().species.name) {
            return 'Aktuelle Stufe';
        } else {
            if (this.isBeforeCurrentStage()) {
                return 'Entwickelt sich aus';
            } else {
                return 'Entwickelt sich in';
            }
        }
    }

}