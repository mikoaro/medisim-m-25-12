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
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hi! How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    },
  ]);

  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    scrollToBottom();
    setInput("");

    setBotTyping(true);

    const botReply = await fakeBotReply(input);

    setBotTyping(false);

    const botMessage = {
      id: Date.now() + 1,
      from: "bot",
      text: botReply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, botMessage]);
    scrollToBottom();
  };

  const fakeBotReply = async (text: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("You said: " + text);
      }, 1200);
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7f7]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      >
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 120 }}
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

                {/* TIMESTAMP */}
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

          {botTyping && (
            <View className="items-start mb-3">
              <View className="bg-[#dfe7f5] px-4 py-2 rounded-2xl rounded-bl-sm">
                <Text className="italic text-black opacity-70">Typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* INPUT BAR */}
        <View className="flex-row items-center px-3 py-3 mx-2 bg-white border-gray-300 rounded-full">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 text-black bg-white rounded-full"
          />

          <TouchableOpacity
            onPress={sendMessage}
            className="p-3 ml-2 bg-blue-500 rounded-full"
          >
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
