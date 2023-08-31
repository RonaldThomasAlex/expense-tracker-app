import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  const recentExpense = expensesContext.expenses.filter((expenses) => {
    const today = new Date();

    const date7daysAgo = getDateMinusDays(today, 7);

    return expenses.days > date7daysAgo && expenses.days <= today;
  });

  return (
    <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpense} />
  );
};

export default RecentExpenses;
