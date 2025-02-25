import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MovieSearchScreen } from "./src/screens/MovieSearchScreen";
import { RootStoreProvider, rootStore } from "./src/models/RootStore";

export default function App() {
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MovieSearchScreen />
      </SafeAreaView>
    </RootStoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
