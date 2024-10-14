import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Attack } from "../types/attack.types";

@Injectable()
export class AttackService {
    private readonly _http = inject(HttpClient);
    private readonly _selectedAttack$ = new BehaviorSubject<Attack | undefined>(undefined);

    public get selectedAttack$() {
        return this._selectedAttack$;
    }

    public changeSelectedAttack(url: string) {
        this._http.get<Attack>(url).subscribe((attack) => this._selectedAttack$.next(attack));
    }

    public clearSelectedAttack() {
        this._selectedAttack$.next(undefined);
    }
}