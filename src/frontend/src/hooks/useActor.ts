import { useInternetIdentity } from "@caffeineai/core-infrastructure";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = Record<string, (...args: any[]) => Promise<any>>;

/**
 * Lightweight useActor shim — the backend interface is currently empty,
 * so we return a null actor and expose isFetching based on II init state.
 */
export function useActor(): { actor: AnyActor | null; isFetching: boolean } {
  const { isInitializing } = useInternetIdentity();
  return { actor: null, isFetching: isInitializing };
}
