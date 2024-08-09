import { SEARCH, STYLESEARCH, STYLEMENU } from "./contants"

//Action Creators
export const search = () => {
    return {
        type: SEARCH
    }
}

export const styleSearch = () => {
    return {
        type: STYLESEARCH
    }
}

export const styleMenu = () => {
    return {
        type: STYLEMENU
    }
}
