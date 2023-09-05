import { View, StyleSheet, Text } from "react-native";

import Input from "./Input";

const ExpenseForm = () => {
  function amountChangeHandler() {}

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>

      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler
          }}
        />

        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {}
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: () => {}
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center"
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1
  }
});
