import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2021-12-19")
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.99,
//     date: new Date("2022-01-29")
//   },
//   {
//     id: "e3",
//     description: "Some bananas",
//     amount: 6.99,
//     date: new Date("2022-05-19")
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-11")
//   },
//   {
//     id: "e5",
//     description: "A tech course",
//     amount: 24.99,
//     date: new Date("2023-12-13")
//   },
//   {
//     id: "e6",
//     description: "Some bananas",
//     amount: 6.99,
//     date: new Date("2022-05-19")
//   },
//   {
//     id: "e7",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-11")
//   },
//   {
//     id: "e8",
//     description: "A tech course",
//     amount: 24.99,
//     date: new Date("2023-12-13")
//   }
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => [],
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();

      return inverted;
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updateableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];

      updatedExpenses[updateableExpenseIndex] = updateItem;

      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
