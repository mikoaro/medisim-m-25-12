import { Stack, Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import "@/global.css";

export default function RootLayout() {
  return (
    <>
      {Platform.OS === "android" && (
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="cards"
            options={{
              title: "Cards",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="albums-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="chat"
            options={{
              title: "Chat",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      )}

      {Platform.OS === "web" && <Stack />}
    </>
  );
}
