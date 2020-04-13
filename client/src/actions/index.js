import axios from "axios";
import { FETCH_USER } from "./types";
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};

export const handleToken = (token) => async (dispatch) => {
  const response = await axios.post("/api/stripe", token);
  dispatch({
    //same type as fetchUser because we're expecting the same type
    type: FETCH_USER,
    payload: response.data,
  });
};
