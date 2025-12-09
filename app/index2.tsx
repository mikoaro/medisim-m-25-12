import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">

        {/* TOP BAR */}
        <View className=" mt-4 mb-4">
          <Text className="text-2xl font-bold">Board</Text>

          <TextInput 
            placeholder="Search"
            className="mt-3 px-4 py-3 bg-gray-100 rounded-xl text-gray-700"
          />
        </View>

        {/* STATS ROW */}
        <View className="flex-row justify-between mt-2">
          <View className="bg-white rounded-xl p-4 shadow w-[48%]">
            <Text className="text-gray-500">To-Do Tasks</Text>
            <Text className="text-3xl font-bold mt-2">1</Text>
            <Text className="text-gray-600 mt-1">22% Complete</Text>
          </View>

          <View className="bg-white rounded-xl p-4 shadow w-[48%]">
            <Text className="text-gray-500">In-Progress</Text>
            <Text className="text-3xl font-bold mt-2">2</Text>
            <Text className="text-gray-600 mt-1">25% Complete</Text>
          </View>
        </View>

        {/* PROGRESS CIRCLE (static placeholder) */}
        <View className="mt-5 items-center">
          <View className="w-32 h-32 rounded-full border-[10px] border-blue-500 border-t-gray-200 justify-center items-center">
            <Text className="text-xl font-bold">25%</Text>
          </View>
        </View>

        {/* TASK LIST */}
        <View className="mt-6">
          <Text className="text-lg font-semibold">Tasks</Text>

          {/* CARD */}
          <View className="bg-white p-4 rounded-xl mt-3 shadow">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold">Integrate tanStack Query</Text>
              <View className="px-3 py-1 rounded-full bg-blue-100">
                <Text className="text-blue-700 text-xs">Dev</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2">High • Due Feb 20 2025</Text>
          </View>

          {/* CARD */}
          <View className="bg-white p-4 rounded-xl mt-3 shadow">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold">Implement Posting Analytics</Text>
              <View className="px-3 py-1 rounded-full bg-green-100">
                <Text className="text-green-700 text-xs">Dev</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2">Medium • Due Feb 21 2025</Text>
          </View>

          {/* CARD */}
          <View className="bg-white p-4 rounded-xl mt-3 shadow">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold">Performance Improvements</Text>
              <View className="px-3 py-1 rounded-full bg-yellow-100">
                <Text className="text-yellow-700 text-xs">Dev</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2">Low • Due Mar 02 2025</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
