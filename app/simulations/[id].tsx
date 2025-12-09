import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function SimulationPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>
        Simulation Page
      </Text>

      <Text style={{ marginTop: 10, fontSize: 18 }}>
        You opened: {id}
      </Text>

      {/* Here you can load your 3D model or content */}
    </View>
  );
}
