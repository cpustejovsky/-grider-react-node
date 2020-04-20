import { /*SUBMIT_SUVERY*/ FETCH_SUVERYS } from "../actions/types";
export default function (state = [], action) {
  switch (action.type) {
    // case SUBMIT_SUVERY:
    //   console.log(action.payload);
    case FETCH_SUVERYS:
      return action.payload;
    default:
      return state;
  }
}
