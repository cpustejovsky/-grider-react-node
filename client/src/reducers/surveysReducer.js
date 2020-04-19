import { SUBMIT_SUVERY } from "../actions/types";
export default function(state = [], action) {
    switch(action.type) {
        case SUBMIT_SUVERY:
            console.log(action.payload)
        default:
            return state;
    }
}