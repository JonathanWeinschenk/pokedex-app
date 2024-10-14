import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, RouterLink, RouterOutlet],
    template: `
    <mat-toolbar>
        <span class="titel">Jonathans Pokédex</span>
        <div class="menu">
            <a routerLink="/dashboard">Startseite</a>
            <a routerLink="/pokedex">Pokédex</a>
        </div>
    </mat-toolbar>
    `,
    styles: `
    @import '../../styles/_variables';

    mat-toolbar {
        height: 64px;
        display: flex;
        color: white;
        background: $blue-primary;
        background: linear-gradient(90deg, $blue-primary 0%, $blue-accent 100%);
    }
    .titel {
        margin: 0 10px 0 0;
    }
    .menu {
        margin: 0 auto;
        display: flex;
        gap: 20px;
    }
    a {
        text-decoration: none;
        color: white;
        padding: 5px;

        &:hover{
            color: $blue-dark;
        }
    }
    `
})
export class HeaderComponent {

}