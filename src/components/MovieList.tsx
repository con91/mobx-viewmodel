import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { observer } from "mobx-react-lite";
import { Movie } from "../services/api";

interface MovieListProps {
  movies: Movie[];
  onSelectMovie?: (movie: Movie) => void;
}

export const MovieList: React.FC<MovieListProps> = observer(
  ({ movies, onSelectMovie }: MovieListProps) => {
    const renderMovie: ListRenderItem<Movie> = ({ item }) => (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => onSelectMovie?.(item)}
      >
        <Image
          source={{
            uri:
              item.Poster !== "N/A"
                ? item.Poster
                : "https://via.placeholder.com/150",
          }}
          style={styles.poster}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.year}>{item.Year}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderMovie}
        contentContainerStyle={styles.list}
      />
    );
  }
);

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  movieItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    resizeMode: "cover",
  },
  movieInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: "#666",
  },
});
