import { Component } from "@angular/core";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-item',
    standalone: true,
    imports: [RouterLink],
    template: `
        <h1>Willkommen bei meinem Pokédex-Projekt!</h1>
        <p>Erkunde den Pokédex, in dem du Pokémon durchsuchen, ihre Details ansehen und ihre Entwicklungen entdecken kannst.
            Jedes Pokémon hat einzigartige Attacken, über die du mehr erfahren kannst, wenn du sie anklickst.</p>
        <a routerLink="/pokedex">Erkunde den Pokédex</a>
    `,
    styles: `
    @import '../../styles/_variables';

    :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: $blue-primary;
        text-align: center;
    }

    p {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
        color: $blue-dark;
    }

    a {
        display: inline-block;
        margin: 20px 0 0 0;
        padding: 10px 20px;
        background-color: $blue-accent;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;

        &:hover{
            background-color: $blue-primary;
        }
    }
    `
})
export class DashboardComponent {

}
