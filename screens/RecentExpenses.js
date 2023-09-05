import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpense } from "../utils/http";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      let expenses;
      setIsFetching(true);

      try {
        expenses = await fetchExpense();

        expensesContext.setExpenses(expenses);
      } catch (err) {
        setError("Could not fetch expenses");
      }

      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const recentExpense = expensesContext.expenses?.filter((expenses) => {
    const today = new Date();

    const date7daysAgo = getDateMinusDays(today, 7);

    return expenses.date > date7daysAgo && expenses.date <= today;
  });

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpense}
      fallbackText="No expense registered for last 7 days"
    />
  );
};

export default RecentExpenses;
