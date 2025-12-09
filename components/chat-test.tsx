import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";

export default function VirtualPatientChat() {
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "patient",
      scenario: "Anxiety",
      text:
        `“I'm really scared about the needles. Will I be asleep during the block?”`,
      options: [
        { key: "A", text: `“Don't worry, it's fast.”` },
        { key: "B", text: `“We can give you a mild sedative to help you relax, but you will be awake to help us.”` },
        { key: "C", text: `“You have to be awake so you don't get hurt.”` },
      ]
    }
  ]);

  const [history, setHistory] = useState([]);

  const handleSelectOption = (messageId, option) => {
    const selected = `You selected ${option.key}: ${option.text}`;
    setHistory((prev) => [...prev, selected]);

    // Auto-scroll
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7f7]">
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View key={msg.id} className="w-full mb-6">
            
            {/* ASCII BOX */}
            <View className="p-4 bg-white border border-gray-400 rounded-md">

              <Text className="font-mono"> 👶 VIRTUAL PATIENT </Text>

              <Text className="mt-4 font-mono leading-[20px]">{msg.text}</Text>

              {/* OPTIONS */}
              {msg.options.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => handleSelectOption(msg.id, opt)}
                  className="mt-3"
                >
                  <View className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                    <Text className="font-mono">
                      {opt.key}. {opt.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              <Text className="mt-4 font-mono">
                Select the most empathetic response...
              </Text>
            </View>
          </View>
        ))}

        {/* USER SELECTION HISTORY */}
        {history.map((line, index) => (
          <Text key={index} className="mb-2 font-mono text-sm text-gray-600">
            {line}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
