import { model, Model, prop } from "mobx-keystone";
import { MovieViewModel } from "./MovieViewModel";
import { createContext, useContext } from "react";

@model("App/RootStore")
export class RootStore extends Model({
  movieViewModel: prop(() => new MovieViewModel({})),
}) {}

export const rootStore = new RootStore({});

const RootStoreContext = createContext<RootStore>(rootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export function useRootStore(): RootStore {
  return useContext(RootStoreContext);
}

export function useMovieViewModel(): MovieViewModel {
  const { movieViewModel } = useRootStore();
  return movieViewModel;
}
