import { useRouter } from "expo-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Clock,
  HeartPulse,
  Search,
  Syringe,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { DRUGS, PATIENTS } from "@/constants/MedicalData";

const PATIENT = PATIENTS[1]; // Robert Chen

export default function CardiologySim() {
  const router = useRouter();
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [log, setLog] = useState([
    "14:00 - Simulation Started",
    "14:01 - Monitor Attached",
    "14:02 - 12-Lead ECG Ordered",
  ]);

  const administerDrug = () => {
    if (!selectedDrug) return;
    setLog((prev) => [...prev, `14:05 - Administered ${selectedDrug}`]);
    setSelectedDrug(null);
  };

  return (
    <View className="flex-col flex-1 h-full overflow-hidden bg-black">
      {/* 1. TOP BAR: VITALS STRIP (Always Visible) */}
      <View className="flex-row items-center justify-between h-20 px-6 border-b bg-slate-900 border-slate-800 shrink-0">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="p-2 mr-4 rounded-full bg-slate-800 hover:bg-slate-700"
          >
            <ArrowLeft size={18} className="text-slate-400" />
          </Pressable>
          <View>
            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Patient
            </Text>
            <Text className="text-lg font-bold text-white">
              {PATIENT.name}{" "}
              <Text className="text-sm font-normal text-slate-500">
                | {PATIENT.age}M
              </Text>
            </Text>
          </View>
        </View>

        {/* Vitals */}
        <View className="flex-row gap-10 px-6 py-2 border rounded-lg bg-black/30 border-slate-800">
          <View className="items-center">
            <Text className="text-slate-500 text-[10px] font-bold mb-1">
              HR (BPM)
            </Text>
            <Text className="font-mono text-3xl font-bold text-red-500 animate-pulse shadow-red-500/20 drop-shadow-md">
              {PATIENT.vitals.hr}
            </Text>
          </View>
          <View className="self-center w-px h-8 bg-slate-800" />
          <View className="items-center">
            <Text className="text-slate-500 text-[10px] font-bold mb-1">
              BP (mmHg)
            </Text>
            <Text className="font-mono text-3xl font-bold text-amber-400">
              {PATIENT.vitals.bp}
            </Text>
          </View>
          <View className="self-center w-px h-8 bg-slate-800" />
          <View className="items-center">
            <Text className="text-slate-500 text-[10px] font-bold mb-1">
              SPO2 (%)
            </Text>
            <Text className="font-mono text-3xl font-bold text-cyan-400">
              {PATIENT.vitals.spo2}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-slate-500 text-[10px] font-bold mb-1">
            SIM TIME
          </Text>
          <Text className="font-mono text-lg font-bold text-white">
            00:05:23
          </Text>
        </View>
      </View>

      {/* 2. MAIN SPLIT: 3D VIEW & CONTROLS */}
      <View className="flex-row flex-1">
        {/* CENTER PANE: 3D Viewport */}
        <View className="relative flex-1 border-r bg-slate-950 border-slate-800">
          {/* Simulated 3D Grid Background */}
          <View className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <View className="absolute inset-0 items-center justify-center">
            {/* Placeholder for Three.js Canvas */}
            <View className="relative items-center justify-center border rounded-full w-80 h-80 border-slate-700 bg-slate-900/50 backdrop-blur-sm">
              <View className="absolute inset-0 border-2 border-dashed border-slate-800 rounded-full animate-[spin_10s_linear_infinite]" />
              <HeartPulse size={80} className="text-red-900 opacity-50" />
              <Text className="mt-4 font-mono text-xs tracking-widest text-slate-500">
                [ 3D HEART MODEL ]
              </Text>
              <Text className="text-slate-600 text-[10px]">
                Awaiting WebGL Context...
              </Text>
            </View>
          </View>

          {/* HUD Overlay - Top Left */}
          <View className="absolute flex-row gap-2 top-6 left-6">
            <View className="px-3 py-1 border rounded bg-red-500/20 border-red-500/50">
              <Text className="flex-row items-center text-xs font-bold text-red-400 uppercase">
                <AlertTriangle size={10} className="mr-1" /> SVT Detected
              </Text>
            </View>
            <View className="px-3 py-1 border rounded bg-slate-800/80 border-slate-700">
              <Text className="font-mono text-xs text-slate-400">LEAD II</Text>
            </View>
          </View>

          {/* Action Bar Overlay - Bottom Center */}
          <View className="absolute left-0 right-0 items-center bottom-8">
            <View className="flex-row gap-6 px-6 py-3 border rounded-full shadow-2xl bg-slate-900/90 border-slate-700 backdrop-blur">
              <Pressable className="items-center opacity-50 hover:opacity-100">
                <Zap size={20} className="mb-1 text-yellow-400" />
                <Text className="text-slate-400 text-[10px] font-bold">
                  DEFIB
                </Text>
              </Pressable>
              <View className="w-px h-8 bg-slate-700" />
              <Pressable className="items-center opacity-100">
                <Syringe size={20} className="mb-1 text-cyan-400" />
                <Text className="text-cyan-400 text-[10px] font-bold">
                  MEDS
                </Text>
              </Pressable>
              <View className="w-px h-8 bg-slate-700" />
              <Pressable className="items-center opacity-50 hover:opacity-100">
                <Activity size={20} className="mb-1 text-green-400" />
                <Text className="text-slate-400 text-[10px] font-bold">
                  PACING
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* RIGHT PANE: Intervention Console */}
        <View className="z-10 flex-col shadow-2xl w-96 bg-slate-900">
          {/* Tabs */}
          <View className="flex-row border-b border-slate-800">
            <Pressable className="flex-1 py-4 border-b-2 border-cyan-500 bg-slate-800/50">
              <Text className="text-sm font-bold text-center text-white">
                Medications
              </Text>
            </Pressable>
            <Pressable className="flex-1 py-4 hover:bg-slate-800/50">
              <Text className="text-sm font-bold text-center text-slate-500">
                Labs
              </Text>
            </Pressable>
            <Pressable className="flex-1 py-4 hover:bg-slate-800/50">
              <Text className="text-sm font-bold text-center text-slate-500">
                Access
              </Text>
            </Pressable>
          </View>

          {/* Search */}
          <View className="p-4 border-b border-slate-800">
            <View className="flex-row items-center h-10 px-3 transition-colors border rounded bg-slate-950 border-slate-700 focus:border-cyan-500">
              <Search size={16} className="mr-2 text-slate-500" />
              <TextInput
                placeholder="Search formulary..."
                placeholderTextColor="#64748b"
                className="flex-1 h-full text-sm text-white outline-none"
              />
            </View>
          </View>

          {/* Drug List */}
          <ScrollView
            className="flex-1 px-4 py-4"
            contentContainerStyle={{ gap: 8 }}
          >
            {DRUGS.map((drug) => (
              <Pressable
                key={drug.id}
                onPress={() => setSelectedDrug(drug.name)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedDrug === drug.name
                    ? "bg-cyan-950/40 border-cyan-500 shadow-sm"
                    : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <View className="flex-row items-start justify-between mb-1">
                  <Text
                    className={`font-bold ${selectedDrug === drug.name ? "text-cyan-100" : "text-slate-200"}`}
                  >
                    {drug.name}
                  </Text>
                  <View className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    <Text className="text-slate-400 text-[10px] font-mono">
                      {drug.dose}
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-slate-500">
                  {drug.class} • {drug.route}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Action Footer */}
          <View className="p-4 border-t bg-slate-950 border-slate-800">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                Queue
              </Text>
              {selectedDrug ? (
                <Text className="font-mono text-xs text-cyan-400">
                  {selectedDrug} (IV PUSH)
                </Text>
              ) : (
                <Text className="text-xs italic text-slate-600">
                  No selection
                </Text>
              )}
            </View>
            <Pressable
              onPress={administerDrug}
              disabled={!selectedDrug}
              className={`h-12 rounded-lg items-center justify-center flex-row shadow-lg transition-all active:scale-[0.98] ${
                selectedDrug
                  ? "bg-gradient-to-r from-red-600 to-red-500 hover:to-red-400 shadow-red-900/20"
                  : "bg-slate-800 opacity-50 cursor-not-allowed"
              }`}
            >
              <Syringe
                size={18}
                color={selectedDrug ? "white" : "#94a3b8"}
                className="mr-2"
              />
              <Text
                className={`${selectedDrug ? "text-white" : "text-slate-400"} font-bold tracking-wide`}
              >
                ADMINISTER
              </Text>
            </Pressable>
          </View>

          {/* Event Log */}
          <View className="h-48 p-4 bg-black border-t border-slate-800">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                Simulation Log
              </Text>
              <Clock size={12} className="text-slate-600" />
            </View>
            <ScrollView className="flex-1">
              {log.map((entry, i) => (
                <View key={i} className="flex-row items-start mb-1.5">
                  <Text className="text-slate-600 font-mono text-[10px] mr-2 w-10">
                    {entry.split(" - ")[0]}
                  </Text>
                  <Text className="flex-1 font-mono text-xs text-emerald-500/90">
                    {entry.split(" - ")[1]}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
