import {
  model,
  Model,
  modelAction,
  prop,
  types,
  modelFlow,
  _async,
} from "mobx-keystone";
import { apiService, Movie, SearchResponse } from "../services/api";
import { computed } from "mobx";

@model("App/MovieViewModel")
export class MovieViewModel extends Model({
  // Loading and error states
  isLoading: prop<boolean>(),
  error: prop<string | null>(),

  // Movie-specific state
  movies: prop<Movie[]>(() => []).withSetter(),
  searchQuery: prop<string>(),
  inputValue: prop<string>(),
}) {
  // Computed values
  @computed
  get hasMovies(): boolean {
    return this.movies.length > 0;
  }

  @computed
  get hasError(): boolean {
    return this.error !== null;
  }

  // Actions for state management
  @modelAction
  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  @modelAction
  setError(error: string | null): void {
    this.error = error;
  }

  @modelAction
  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  @modelAction
  setInputValue(value: string): void {
    this.inputValue = value;
  }

  @modelAction
  setMovies(movies: Movie[]): void {
    this.movies = movies;
  }

  @modelAction
  resetState(): void {
    this.isLoading = false;
    this.error = null;
  }

  // View-Model interaction methods
  @modelAction
  handleSearch(): void {
    this.searchMovies(this.inputValue);
  }

  @modelAction
  handleClear(): void {
    this.setInputValue("");
    this.clearResults();
  }

  // Main initialization method
  @modelFlow
  load = _async(function* (this: MovieViewModel, defaultSearchTerm?: string) {
    try {
      this.setLoading(true);
      this.setError(null);

      if (defaultSearchTerm) {
        this.setInputValue(defaultSearchTerm);
        yield this.searchMovies(defaultSearchTerm);
      }
    } catch (error) {
      this.setError((error as Error).message);
    } finally {
      this.setLoading(false);
    }
  });

  // Flows (async actions)
  @modelFlow
  searchMovies = _async(function* (this: MovieViewModel, query?: string) {
    if (query !== undefined) {
      this.setSearchQuery(query);
    }

    if (!this.searchQuery.trim()) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const response: SearchResponse = yield apiService.searchMovies(
        this.searchQuery
      );

      if (response.Response === "True") {
        this.setMovies(response.Search);
      } else {
        this.setError(response.Error || "No movies found");
        this.setMovies([]);
      }
    } catch (error) {
      this.setError((error as Error).message);
      this.setMovies([]);
    } finally {
      this.setLoading(false);
    }
  });

  @modelAction
  clearResults(): void {
    this.movies = [];
    this.searchQuery = "";
    this.resetState();
  }
}
