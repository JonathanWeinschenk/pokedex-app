import { Component } from "@angular/core";
import { PokemonPickerComponent } from "../components/pokemon-picker.component";
import { PokemonDetailComponent } from "../components/pokemon-detail/pokemon-detail.component";

@Component({
    selector: 'app-pokedex',
    standalone: true,
    imports: [PokemonPickerComponent, PokemonDetailComponent],
    template: `<app-pokemon-picker /><app-pokemon-detail />`,
    styles: `:host {
        flex: 1;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }`
})
export class PokedexComponent {

}
