import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpense } from "../utils/http";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpense();
      expensesContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpense = expensesContext.expenses?.filter((expenses) => {
    const today = new Date();

    const date7daysAgo = getDateMinusDays(today, 7);

    return expenses.date > date7daysAgo && expenses.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpense}
      fallbackText="No expense registered for last 7 days"
    />
  );
};

export default RecentExpenses;
