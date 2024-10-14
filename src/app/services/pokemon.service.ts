import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, filter, switchMap } from "rxjs";
import { EvolutionChain, Pokemon, PokemonDetails, Species } from "../types/pokemon.type";

@Injectable()
export class PokemonService {
    private readonly _http = inject(HttpClient);
    private readonly _selectedPokemon$ = new BehaviorSubject<Pokemon | undefined>(undefined);

    public get selectedPokemon$() {
        return this._selectedPokemon$;
    }

    public set selectedPokemon(pokemon: Pokemon) {
        this._selectedPokemon$.next(pokemon);
    }

    public get selectedPokemonDetails$() {
        return this._selectedPokemon$.pipe(
            filter((pokemon) => pokemon !== undefined),
            switchMap((pokemon) => this._http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${pokemon?.name}`))
        );
    }

    public get pokemonEvolutions$() {
        return this._selectedPokemon$.pipe(
            filter((pokemon) => pokemon !== undefined),
            switchMap((pokemon) => this._http.get<Species>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`).pipe(
                switchMap((species) => this._http.get<EvolutionChain>(species.evolution_chain.url))
            ))
        );
    }
}