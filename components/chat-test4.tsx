import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { Send } from "lucide-react-native";

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
        "You have to be awake so you don't get hurt.",
      ],
      correct: 1,
    },
    {
      id: 2,
      patient: "Okay… that helps a bit. Will it be very painful?",
      options: [
        "You shouldn't feel pain, just pressure. Tell me anytime if you're uncomfortable.",
        "It's painful for everyone. Just endure it.",
        "I don’t know, it depends on you.",
      ],
      correct: 0,
    },
  ];

  // Chat messages display
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: scenarios[0].patient,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  // ─────────────────────────────────────────────────────────────
  // NEXT PATIENT MESSAGE
  // ─────────────────────────────────────────────────────────────
  const sendNextPatientLine = () => {
    const nextStep = step + 1;

    if (nextStep < scenarios.length) {
      const nextPatient = {
        id: Date.now() + 1,
        from: "bot",
        text: scenarios[nextStep].patient,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, nextPatient]);
        scrollToBottom();
      }, 800);

      setStep(nextStep);
    } else {
      const finalMsg = {
        id: Date.now() + 2,
        from: "bot",
        text: "Great job! You completed the scenario.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, finalMsg]);
        scrollToBottom();
      }, 800);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // USER SELECTS OPTION
  // ─────────────────────────────────────────────────────────────
  const handleOptionSelect = (option: string) => {
    const userMsg = {
      id: Date.now(),
      from: "user",
      text: option,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();

    sendNextPatientLine();
  };

  // ─────────────────────────────────────────────────────────────
  // USER SENDS TYPED MESSAGE
  // ─────────────────────────────────────────────────────────────
  const handleSendTyped = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    scrollToBottom();

    sendNextPatientLine();
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
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={
                msg.from === "user"
                  ? "items-end mb-3"
                  : "items-start mb-3"
              }
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
              </View>
            </View>
          ))}
        </ScrollView>

        {/* OPTIONS + TEXT INPUT */}
        <View className="absolute left-0 right-0 px-4 bottom-2">
          {/* MULTIPLE-CHOICE OPTIONS */}
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

          <Text className="mt-2 mb-2 font-mono text-center">
            Select an empathetic response or type your own...
          </Text>

          {/* TEXT INPUT BAR */}
          <View className="flex-row items-center px-3 py-3 bg-white rounded-full">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your response..."
              className="flex-1 px-3 py-2 text-black"
            />

            <TouchableOpacity
              onPress={handleSendTyped}
              className="p-3 ml-2 bg-blue-500 rounded-full"
            >
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
