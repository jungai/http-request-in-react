import ky from "ky";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

export type IQ = Record<string, string | number>;

export interface IHookState<T> {
  loading: boolean;
  data?: T | null;
  error?: string | object | null;
}

export interface IUseFetchApiParams {
  initialPath: string;
  q?: IQ;
}

export type IUseFetchApiResult<T> = IHookState<T> & {
  refetch: () => void;
  setPath: Dispatch<SetStateAction<string>>;
  setQueryParams: Dispatch<SetStateAction<IQ>>;
};

// this might be data_services 🧐
// or HOF thing
export function useFetchApi<T>(
  params: IUseFetchApiParams
): IUseFetchApiResult<T> {
  const { initialPath, q = {} } = params;
  const [queryParams, setQueryParams] = useState(q);
  const [path, setPath] = useState(initialPath);
  const [state, setState] = useState<IHookState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
    )
    .join("&");

  // for refetch
  const [refetchIndex, setRefetchIndex] = useState(0);
  const refetch = () => setRefetchIndex((prev) => prev + 1);

  useEffect(() => {
    (async () => {
      try {
        console.log("-> is fetch");
        setState((val) => ({ ...val, data: null, loading: true }));
        const data = await ky.get(`${path}?${queryString}`).json<T>();
        setState((val) => ({ ...val, loading: false, data }));
      } catch (err) {
        setState((val) => ({ ...val, error: err }));
        // throw new Error cannot use in useEffect
        // hack thing (for error boundary)
        // setState(() => { throw new Error(err)})
        // throw new Error(err)
      }
    })();
  }, [path, refetchIndex, queryParams]);

  return { ...state, refetch, setPath, setQueryParams };
}
