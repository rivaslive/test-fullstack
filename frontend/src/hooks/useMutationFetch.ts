import { useCallback, useState } from 'react';
import fetchInstance from 'services/fetchInstance';

interface UserPostFetchProps {
  path: string;
  type?: 'post' | 'put' | 'delete';
}

type ReturnHook<Response, Request> = [
  (payload: Request, id?: string | number) => Promise<Response | null>,
  {
    loading: boolean;
    errors: string | null;
    data: any;
  }
];

export default function useMutationFetch<T, Request>({
  path,
  type = 'post',
}: UserPostFetchProps): ReturnHook<T, Request> {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  const callback = useCallback(
    async (payload: Request, id: string | number = '') => {
      setLoading(true);
      try {
        const { data } = await fetchInstance[type]<T>(`${path}/${id}`, payload);
        setData(data);
        setLoading(false);
        return data;
      } catch (error: any) {
        setErrors(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          error?.message ?? error?.response?.data?.message ?? 'Error in request'
        );
      }
      setLoading(false);
      return null;
    },
    [path, type]
  );

  return [
    callback,
    {
      loading,
      data,
      errors,
    },
  ];
}
