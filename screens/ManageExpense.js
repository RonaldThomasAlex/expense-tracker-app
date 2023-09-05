import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";

const ManageExpenses = ({ route, navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const expensesContext = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense"
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteExpenseHandler() {
    setIsFetching(true);

    try {
      await deleteExpense(expenseId);

      expensesContext.deleteExpense(expenseId);

      navigation.goBack();
    } catch (err) {
      setError("Could not delete. Please try again later");

      setIsFetching(false);
    }
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true);

    try {
      if (isEditing) {
        expensesContext.updateExpense(expenseId, expenseData);

        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);

        expensesContext.addExpense({ ...expenseData, id: id });
      }

      navigation.goBack();
    } catch (err) {
      setError("Could not save date. Please try again later");

      setIsFetching(false);
    }
  }

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
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
});
