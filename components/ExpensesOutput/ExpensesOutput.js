import { View } from "react-native";
import ExpenseList from "./ExpenseList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19")
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-01-29")
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 6.99,
    date: new Date("2022-05-19")
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-11")
  },
  {
    id: "e4",
    description: "A tech course",
    amount: 24.99,
    date: new Date("2023-12-13")
  }
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />

      <ExpenseList />
    </View>
  );
};

export default ExpensesOutput;
