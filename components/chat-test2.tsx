import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";

export default function Chat() {
  // ─────────────────────────────────────────────────────────────
  // VIRTUAL PATIENT SCENARIOS
  // ─────────────────────────────────────────────────────────────
  const scenarios = [
    {
      id: 1,
      patient: "I'm really scared about the needles. Will I be asleep during the block?",
      options: [
        "Don't worry, it's fast.",
        "We can give you a mild sedative to help you relax, but you will be awake to help us.",
        "You have to be awake so you don't get hurt."
      ],
      correct: 1
    },
    {
      id: 2,
      patient: "Okay… that helps a bit. Will it be very painful?",
      options: [
        "You shouldn't feel pain, just pressure. Tell me anytime if you're uncomfortable.",
        "It's painful for everyone. Just endure it.",
        "I don’t know, it depends on you."
      ],
      correct: 0
    },
  ];

  // Chat messages display
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: scenarios[0].patient,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    },
  ]);

  const [step, setStep] = useState(0); // current scenario index
  const scrollRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────
  // USER SELECTS AN OPTION
  // ─────────────────────────────────────────────────────────────
  const handleOptionSelect = (option: string) => {
    const userMessage = {
      id: Date.now(),
      from: "user",
      text: option,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // Add the user's response
    setMessages(prev => [...prev, userMessage]);
    scrollToBottom();

    // NEXT PATIENT QUESTION
    const nextStep = step + 1;

    if (nextStep < scenarios.length) {
      const nextPatientMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: scenarios[nextStep].patient,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setTimeout(() => {
        setMessages(prev => [...prev, nextPatientMessage]);
        scrollToBottom();
      }, 800);

      setStep(nextStep);
    } else {
      // Conversation finished
      setTimeout(() => {
        const endMessage = {
          id: Date.now() + 2,
          from: "bot",
          text: "Great job! You completed the scenario.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages(prev => [...prev, endMessage]);
        scrollToBottom();
      }, 800);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7f7]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={msg.from === "user" ? "items-end mb-3" : "items-start mb-3"}
            >
              <View
                className={
                  msg.from === "user"
                    ? "bg-blue-500 px-4 py-2 rounded-2xl max-w-[80%] rounded-br-sm"
                    : "bg-[#dfe7f5] px-4 py-2 rounded-2xl max-w-[80%] rounded-bl-sm"
                }
              >
                <Text className={msg.from === "user" ? "text-white" : "text-black"}>
                  {msg.text}
                </Text>

                <Text
                  className={
                    msg.from === "user"
                      ? "text-white opacity-60 text-xs mt-1 text-right"
                      : "text-black opacity-60 text-xs mt-1"
                  }
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ───────────────────────────────────────────────────────────── */}
        {/*     OPTION BUTTONS (replace text input)                     */}
        {/* ───────────────────────────────────────────────────────────── */}
        <View className="absolute left-0 right-0 px-4 bottom-2">
          {scenarios[step] &&
            scenarios[step].options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(opt)}
                className="p-3 mb-2 bg-white border border-gray-200 shadow rounded-xl"
              >
                <Text className="text-black">{opt}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
