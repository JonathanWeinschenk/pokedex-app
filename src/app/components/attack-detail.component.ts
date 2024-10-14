import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AttackService } from "../services/attack.service";

@Component({
    selector: 'app-attack-detail',
    standalone: true,
    imports: [MatProgressSpinnerModule, MatDialogModule, MatButtonModule],
    template: `
    @if(this.attack(); as attack){
        <h2 mat-dialog-title>{{ attack.name }}</h2>
        <mat-dialog-content>
            @if(attack.accuracy){
            <div class="info-container">
                <div class="accuracy-container">
                    <div class="accuracy" [style.width.%]="attack.accuracy">
                        <span class="value">{{ attack.accuracy }}%</span>
                    </div>
                </div>
                <span>Genauigkeit</span>
            </div>}
            <div class="info-container">
                <span class="value">{{ attack.pp }}</span>
                <span>PP</span>
            </div>
            <div class="info-container">
                <span class="value">{{ attack.damage_class.name}}</span>
                <span>Schadensart</span>
            </div>
            <div class="info-container">
                <span class="value">{{ attack.type.name}}</span>
                <span>Attackentyp</span>
            </div>
            <div class="info-container">
                <span class="value">{{ attack.target.name}}</span>
                <span>Ziel</span>
            </div>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Schließen</button>
        </mat-dialog-actions>
    } @else {
        <mat-spinner></mat-spinner>
    }
    `,
    styles: `
    @import '../../styles/_variables';

    mat-spinner {
        margin: 100px auto;
    }
    mat-dialog-content {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        text-align: center;
        align-items: center;
    }

    .accuracy-container {
        width: 100px;
        background-color: $blue-pale;
        border-radius: 5px;
        overflow: hidden;
    }
    
    .accuracy {
        background-color: $blue-accent;
        text-align: center;
        border-radius: 5px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
    }

    .value {
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
    }
    `
})
export class AttackDetailComponent {
    private readonly _attackService = inject(AttackService);
    protected attack = toSignal(this._attackService.selectedAttack$);
}