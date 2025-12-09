import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cards() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">

        {/* TOP BAR */}
        <View className="mb-4 ">
          <Text className="text-2xl font-bold text-center">CARDS</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
