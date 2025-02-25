import {
  model,
  tProp,
  types,
  Model,
  modelAction,
  modelFlow,
  _async,
} from "mobx-keystone";

@model("App/BaseViewModel")
export abstract class BaseViewModel extends Model({
  isLoading: tProp(types.boolean, false),
  error: tProp(types.maybeNull(types.string), null),
  isInitialized: tProp(types.boolean, false),
}) {
  // Abstract method that child ViewModels must implement
  abstract load(...args: unknown[]): Promise<void>;

  @modelAction
  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  @modelAction
  setError(error: string | null): void {
    this.error = error;
  }

  @modelAction
  setInitialized(initialized: boolean): void {
    this.isInitialized = initialized;
  }

  @modelAction
  resetState(): void {
    this.isLoading = false;
    this.error = null;
  }

  // A common loadWithErrorHandling wrapper that calls the child's load implementation
  @modelFlow
  loadWithErrorHandling = _async(function* <T extends unknown[]>(
    this: BaseViewModel,
    ...args: T
  ) {
    try {
      this.setLoading(true);
      this.setError(null);

      yield this.load(...args);

      this.setInitialized(true);
    } catch (error) {
      this.setError((error as Error).message);
    } finally {
      this.setLoading(false);
    }
  });
}
