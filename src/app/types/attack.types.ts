export interface Attack {
    name: string,
    accuracy: number,
    pp: number,
    damage_class: {
        name: string
    },
    target: {
        name: string
    },
    type: {
        name: string
    }
}