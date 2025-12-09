import { useRef, useState } from "react";
import { View, TouchableOpacity, Text, PanResponder } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export default function ThreeModel() {
  const modelRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [key: string]: THREE.AnimationAction }>({});
  const currentAnim = useRef("Idle");

  // Store rotation gestures
  const rotation = useRef({ x: 0, y: 0 });

  // Touch / mouse controls (Orbit-like)
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (modelRef.current) {
        rotation.current.y = gesture.dx * 0.01;
        rotation.current.x = gesture.dy * 0.01;
      }
    },
  });

  const triggerAnimation = (name: string) => {
    if (!mixerRef.current) return;

    const prev = actionsRef.current[currentAnim.current];
    const next = actionsRef.current[name];

    if (prev && next && prev !== next) {
      prev.fadeOut(0.5);
      next.reset().fadeIn(0.5).play();
      currentAnim.current = name;
    }
  };

  return (
    <View className="flex-1 w-full">
      {/* BUTTON TO TRIGGER ANIMATION */}
      <TouchableOpacity
      className="p-12 bg-blue-600 rounded-lg m-10"
        onPress={() =>
          triggerAnimation(currentAnim.current === "Idle" ? "Breathing" : "Idle")
        }
      >
        <Text className="text-white text-center">
          Toggle Animation
        </Text>
      </TouchableOpacity>

      <GLView className="flex-1 bg-blue-950"
        {...panResponder.panHandlers}
        onContextCreate={async (gl) => {
          const renderer = new Renderer({ gl });
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

          const scene = new THREE.Scene();
          scene.background = new THREE.Color("#f3f3f3");

          const camera = new THREE.PerspectiveCamera(
            45,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            100
          );
          camera.position.set(0, 0, 3);

          // Soft environment lighting
          scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1));
          const light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(5, 10, 10);
          scene.add(light);

          // Load model
          const loader = new GLTFLoader();
          loader.load(
            "/models/patient.glb",
            (gltf) => {
              const model = gltf.scene;
              model.position.set(0, -1, 0);
               model.rotation.set(0, 5, 0);
              model.scale.set(1, 1, 1);
              scene.add(model);
              modelRef.current = model;

              // ANIMATIONS
              mixerRef.current = new THREE.AnimationMixer(model);

              gltf.animations[0].name = "Breathing";
              gltf.animations[1].name = "Idle";

              gltf.animations.forEach((clip) => {
                const action = mixerRef.current!.clipAction(clip);
                actionsRef.current[clip.name] = action;
              });

              // Play default
              actionsRef.current["Idle"].play();
            }
          );

          const clock = new THREE.Clock();

          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);

            // Apply rotation from gestures
            if (modelRef.current) {
              modelRef.current.rotation.y += rotation.current.y * 0.1;
              modelRef.current.rotation.x += rotation.current.x * 0.1;

              rotation.current.x *= 0.9; // damping
              rotation.current.y *= 0.9;
            }

            // Update animation mixer
            if (mixerRef.current) {
              mixerRef.current.update(clock.getDelta());
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
          };

          animate();
        }}
      />
    </View>
  );
}
