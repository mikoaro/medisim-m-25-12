import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
  Modal,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";

// Enable animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// TODO: Update this import path to your actual data file
import { MEDICAL_CATEGORIES } from "../../lib/data";
import { Tabs } from "expo-router";
import { Badge } from "@react-navigation/elements";

// Convert your dataset to a UI-friendly structure
const CATEGORIES = MEDICAL_CATEGORIES.map((c) => ({
  id: c.id,
  title: c.title,
  emoji: c.icon,
  count: c.count,
  status: c.status,
  isNew: c.isNew ?? false,
  // Auto-generate sims based on count
  sims: Array.from(
    { length: c.count },
    (_, i) => `${c.title} Simulation ${i + 1}`
  ),
}));

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeJump, setActiveJump] = useState("A-E");
  const [selected, setSelected] = useState(CATEGORIES[0]?.id);
  const [modal, setModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  const { width } = Dimensions.get("window");
  const isMobile = width < 768;

  /* ANIMATIONS */
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const drawer = useRef(new Animated.Value(-260)).current;

  /* DETAILS ANIMATION */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selected]);

  /* DRAWER ANIMATION */
  const toggleDrawer = () => {
    Animated.timing(drawer, {
      toValue: showNav ? -260 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setShowNav(!showNav);
  };

  /* FILTERING + LETTER RANGES */
  const filtered = useMemo(() => {
    const ranges = {
      "A-E": ["A", "B", "C", "D", "E"],
      "F-J": ["F", "G", "H", "I", "J"],
      "K-O": ["K", "L", "M", "N", "O"],
      "P-T": ["P", "Q", "R", "S", "T"],
      "U-Z": ["U", "V", "W", "X", "Y", "Z"],
    };

    return CATEGORIES.filter((c) => {
      if (!ranges[activeJump].includes(c.title[0].toUpperCase())) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, activeJump]);

  const selectedObj = CATEGORIES.find((c) => c.id === selected);

  function speak(text: string) {
    Speech.speak(text);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* MOBILE Tabs */}
      {Platform.OS === "android" && (
        <View className="flex-1 gap-3 p-3">
          <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="cards" options={{ title: "Card" }} />
            <Tabs.Screen name="chat" options={{ title: "Chat" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
          </Tabs>
          {/* GREETING */}
          <View className="gap-5 px-5 mt-4">
            <Text className="text-2xl font-semibold text-gray-900">
              👋 Good Morning, Dr. User
            </Text>
            <Text className="mt-1 text-gray-500">🔥 12-Day Streak</Text>
          </View>
          {/* NOTIFICATION CARD */}
          <View className="flex flex-row mt-5">
            <Text className="text-blue-500">NOTIFICATIONS</Text>
          </View>
          <View className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <Text className="mb-1 text-sm text-gray-500">NEW ASSIGNMENT</Text>

            <Text className="text-lg font-semibold text-gray-900">
              Pain Management: Interscalene Block
            </Text>

            <Text className="mt-1 text-gray-500">From: Dr. S. Chen</Text>

            <View className="flex-row mt-4">
              <TouchableOpacity className="flex-1 py-3 mr-2 border border-gray-300 rounded-xl">
                <Text className="font-semibold text-center text-gray-700">
                  Open in Desktop
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 py-3 ml-2 bg-blue-600 rounded-xl">
                <Text className="font-semibold text-center text-white">
                  Start Pre-Quiz →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* QUICK ACTION ENTRY */}
          <View className="p-4 mb-3 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <Text className="text-lg font-semibold text-gray-900">
              ⚡ Daily Flashcards
            </Text>
            <Text className="mt-1 text-gray-500">
              20 Cards Due • Anesthesia
            </Text>
          </View>

          <View className="p-4 mb-3 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <Text className="text-lg font-semibold text-gray-900">
              Dialog Trainer
            </Text>
            <Text className="mt-1 text-gray-500">"Patient Anxiety"</Text>
          </View>
        </View>
      )}

      {Platform.OS === "web" && (
        <View className="flex-row flex-1">
          {/* LEFT PANEL (TABLET) */}

          <View className="w-64 p-4 border-r border-gray-300">
            <Text className="mb-3 text-lg font-bold">Navigation</Text>

            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              className="p-2 mb-3 bg-white border border-gray-300 rounded"
            />

            <Text className="mt-4 font-semibold">Jump To</Text>
            {["A-E", "F-J", "K-O", "P-T", "U-Z"].map((r) => (
              <TouchableOpacity key={r} onPress={() => setActiveJump(r)}>
                <Text
                  className={`p-2 ${
                    activeJump === r ? "text-blue-600 font-bold" : ""
                  }`}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity className="flex py-3 mt-5 bg-blue-600 rounded-xl"
             onPress={() => router.push("/chat")}>
                <Text className="font-semibold text-center text-white">
                  Chat
                </Text>
            </TouchableOpacity>
          </View>

          {/* CENTER GRID */}
          <ScrollView className="flex-1 p-4">
            <Text className="mb-3 text-lg font-bold">
              Categories ({activeJump})
            </Text>

            <View className="flex-row flex-wrap justify-between">
              {filtered.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setSelected(cat.id);
                    speak(cat.title);
                  }}
                  className={`w-[48%] mb-3 p-4 rounded-xl border ${
                    selected === cat.id
                      ? "border-blue-500 bg-blue-50"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text className="text-3xl">{cat.emoji}</Text>

                  <View className="flex-row items-center gap-2 mt-2">
                    <Text className="font-bold">{cat.title}</Text>
                    {cat.isNew && (
                      <Text className="px-2 py-1 text-xs text-green-800 bg-green-200 rounded-full">
                        NEW
                      </Text>
                    )}
                  </View>

                  <Text className="text-sm text-gray-500">
                    {cat.count} Sims
                  </Text>

                  <Text
                    className={`
                    text-xs mt-1 px-2 py-1 rounded-full self-start
                    ${
                      cat.status === "completed"
                        ? "bg-green-200 text-green-700"
                        : cat.status === "in-progress"
                        ? "bg-yellow-200 text-yellow-700"
                        : cat.status === "locked"
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                  >
                    {cat.status.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* RIGHT PANEL (TABLET) */}
          {selectedObj && (
            <View className="p-4 w-80">
              <Text className="mb-3 text-lg font-bold">Details</Text>

              <Animated.View
                style={{ opacity: fade, transform: [{ translateY: slide }] }}
                className="p-4 bg-white border border-gray-300 rounded-xl"
              >
                <Text className="text-4xl text-center">
                  {selectedObj.emoji}
                </Text>
                <Text className="mt-2 text-lg font-bold text-center">
                  {selectedObj.title}
                </Text>

                <Text className="mt-1 text-center text-gray-600">
                  {selectedObj.count} Learning Modules
                </Text>

                <Text className="mt-3 mb-2 font-semibold text-center">
                  Status: {selectedObj.status}
                </Text>

                {selectedObj.isNew && (
                  <Text className="font-semibold text-center text-green-600">
                    ✨ New Content Added
                  </Text>
                )}

                <Text className="mt-3 mb-2 font-bold text-center">
                  Available Sims
                </Text>
                {selectedObj.sims.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => {
                      const simId = s.toLowerCase().replace(/\s+/g, "-");
                      router.push(`/simulations/${simId}`);
                    }}
                  >
                    <Text className="p-2 text-center">{s}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  onPress={() => setModal(true)}
                  className="p-3 mt-3 bg-gray-100 rounded-xl"
                >
                  <Text className="font-bold text-center">OPEN CATEGORY</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </View>
      )}

      {/* MODAL */}
      <Modal visible={modal} transparent animationType="fade">
        <View className="justify-center flex-1 p-6 bg-black/40">
          <View className="p-6 bg-white rounded-xl">
            <Text className="text-xl font-bold">{selectedObj?.title}</Text>

            <Text className="mt-4 font-bold">Sim List</Text>
            {selectedObj?.sims.map((s) => (
              <Text key={s} className="my-1">
                • {s}
              </Text>
            ))}

            <TouchableOpacity onPress={() => setModal(false)} className="mt-4">
              <Text className="font-bold text-right text-blue-600">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
