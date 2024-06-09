import axios from "axios";
import { fetchTodosSuccess } from "./store";

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      dispatch(fetchTodosSuccess(response.data));
    } catch (error) {
      console.log("Error fetching todos: ", error);
    }
  };
};
