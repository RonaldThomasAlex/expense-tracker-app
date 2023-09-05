import { View, Text, TextInput } from "react-native";

const Input = ({ label, textInputConfig }) => {
  return (
    <View>
      <Text>{label}</Text>

      <TextInput {...textInputConfig} />
    </View>
  );
};

export default Input;
