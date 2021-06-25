import ky from "ky";
import { useState } from "react";

export type IMutateMethod = "post" | "put";

export interface IState<T> {
  loading: boolean;
  data?: T | null;
  error?: string | null | object;
}

export interface IUseMutateApiParams<U> {
  path: string;
  method: IMutateMethod;
  reqBody: U;
}

export function useMutateApi<T, U extends Record<string, unknown>>(
  params: IUseMutateApiParams<U>
) {
  const { path, method, reqBody } = params;
  const [state, setState] = useState<IState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const callApi = async () => {
    try {
      console.log(`-> ${method}`);
      setState((prev) => ({ ...prev, data: null, loading: true }));
      const data = await ky[method](path, { json: reqBody }).json<T>();
      setState((prev) => ({ ...prev, data, loading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, error }));
    }
  };

  return { ...state, callApi };
}
