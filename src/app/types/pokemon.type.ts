export interface Pokemon {
    url: string,
    name: string,
}

export interface PokemonDetails {
    abilities: Abilitiy[],
    base_experience: number,
    cries: {
        latest: string
    }
    height: number,
    held_items: Item[],
    moves: Move[],
    name: string,
    sprites: {
        front_default: string,
        front_shiny: string,
        front_female: string,
        front_shiny_female: string
    }
    id: number,
    stats: Stat[],
    weight: number
}

interface Abilitiy {
    ability: {
        name: string
    },
    is_hidden: boolean
}

interface Item {
    item: {
        name: string
    }
}

export interface Move {
    move: {
        name: string,
        url: string
    }
}

interface Stat {
    base_stat: number,
    stat: {
        name: string
    }
}

export interface Species {
    evolution_chain: {
        url: string
    }
}

export interface EvolutionChain {
    chain: Evolution
}

export interface Evolution {
    evolves_to: Evolution[],
    species: {
        name: string
    },
    is_baby: boolean

}