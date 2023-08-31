import { useLayoutEffect } from "react";
import { Text } from "react-native";

const ManageExpenses = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense"
    });
  }, [navigation, isEditing]);

  return <Text>Manage expense - {expenseId}</Text>;
};

export default ManageExpenses;
