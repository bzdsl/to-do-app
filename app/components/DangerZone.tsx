/** @format */

import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  const clearAllTodos = useMutation(api.todos.deleteAllTodo);
  const handleResetApp = async () => {
    Alert.alert(
      "Reset App",
      "Are you sure you want to reset the app? This will delete all your todos.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}`
              );
            } catch (error) {
              console.log("Error deleting all todos", error);
              Alert.alert("Error", "Failed to reset app");
            }
          },
        },
      ]
    );
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}>
      <Text style={settingsStyle.sectionTitleDanger}>Danger Zone</Text>
      <TouchableOpacity
        style={[settingsStyle.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}>
        <View style={settingsStyle.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyle.actionIcon}>
            <Ionicons name="trash" size={18} color={"#fff"} />
          </LinearGradient>
          <Text style={settingsStyle.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
