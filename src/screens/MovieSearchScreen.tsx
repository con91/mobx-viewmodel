import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useMovieViewModel } from "../models/RootStore";
import { MovieList } from "../components/MovieList";

export const MovieSearchScreen: React.FC = observer(() => {
  const movieViewModel = useMovieViewModel();

  /// moves to page container view.
  useEffect(() => {
    movieViewModel.load("Star Wars");
  }, [movieViewModel]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={movieViewModel.inputValue}
          onChangeText={(text) => movieViewModel.setInputValue(text)}
          placeholder="Search for movies..."
          onSubmitEditing={() => movieViewModel.handleSearch()}
        />
        <Button title="Search" onPress={() => movieViewModel.handleSearch()} />
        <Button title="Clear" onPress={() => movieViewModel.handleClear()} />
      </View>

      {movieViewModel.isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loaderText}>Loading movies...</Text>
        </View>
      )}

      {movieViewModel.hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{movieViewModel.error}</Text>
        </View>
      )}

      {!movieViewModel.isLoading && movieViewModel.hasMovies && (
        <MovieList
          movies={movieViewModel.movies}
          onSelectMovie={(movie) => {
            console.log("Selected movie:", movie.Title);
          }}
        />
      )}

      {!movieViewModel.isLoading &&
        !movieViewModel.hasMovies &&
        !movieViewModel.hasError && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Search for movies to display results
            </Text>
          </View>
        )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#ffebee",
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: "#c62828",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#757575",
  },
});
