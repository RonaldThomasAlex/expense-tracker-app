import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://react-native-course-f020b-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
