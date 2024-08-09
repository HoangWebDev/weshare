import { StateType, ActionType } from "~/types/Types/reducerTypes";
import { SEARCH, STYLESEARCH, STYLEMENU } from "./contants";

//InitState
export const initState: StateType = {
    search: false,
    styleSearch: false,
    styleMenu: false
};

//Reducer
export const reducer = (state: StateType, action: ActionType) => {
    let newState
    switch (action.type) {
        case SEARCH:
            newState = {
                ...state,
                search: !state.search
            }
            break
        case STYLESEARCH:
            newState = {
                ...state,
                styleSearch: !state.styleSearch
            }
            break
        case STYLEMENU:
            newState = {
                ...state,
                styleMenu: !state.styleMenu
            }
            break
        default:
            throw new Error("Invalid action")
    }
    return newState
}
