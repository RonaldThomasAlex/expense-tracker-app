import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
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
    id: "e5",
    description: "A tech course",
    amount: 24.99,
    date: new Date("2023-12-13")
  }
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />

      <ExpenseList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
