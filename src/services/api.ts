export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

class ApiService {
  private readonly API_KEY = "90c9fb99";
  private readonly BASE_URL = "http://www.omdbapi.com/";

  async searchMovies(query: string): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?apikey=${this.API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data: SearchResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch movies");
    }
  }

  async getMovieDetails(imdbId: string): Promise<MovieDetails> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?apikey=${this.API_KEY}&i=${imdbId}`
      );
      const data: MovieDetails = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch movie details");
    }
  }
}

export const apiService = new ApiService();
