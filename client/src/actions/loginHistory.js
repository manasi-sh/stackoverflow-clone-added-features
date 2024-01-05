import * as api from "../api";

export const fetchHistory = () => async (dispatch) => {
    try {
      const { data } = await api.getHistory();
      dispatch({ type: "FETCH_HISTORY", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

