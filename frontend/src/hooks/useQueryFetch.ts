import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import fetchInstance from 'services/fetchInstance';

type FilterType = { key: string; value?: string | number }[];

interface UserGetFetchProps {
  path: string;
  skip?: boolean;
  filters?: FilterType;
}

export default function useQueryFetch<T>({
  path,
  skip,
  filters: filtersProp,
}: UserGetFetchProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  const getData = useCallback(
    async (opts?: { filter?: FilterType; options?: AxiosRequestConfig }) => {
      setLoading(true);
      try {
        let preparedFilter = filtersProp
          ? filtersProp?.map((item) => `${item.key}=${item.value}`).join('&')
          : '';

        if (opts?.filter) {
          opts?.filter?.forEach((item) => {
            const findRule = preparedFilter.includes(item.key);
            if (!findRule) {
              preparedFilter += `&${item.key}=${item.value}`;
            }
          });
        }

        const { data } = await fetchInstance.get<T>(
          `${path}?${preparedFilter}`,
          opts?.options
        );
        setData(data);
      } catch (error: any) {
        setErrors(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          error?.message ?? error?.response?.data?.message ?? 'Error in request'
        );
      }
      setLoading(false);
    },
    [path, filtersProp]
  );

  useEffect(() => {
    if (!skip) {
      getData().then();
    }
  }, [getData, skip]);

  return {
    loading,
    data,
    errors,
    getData,
  };
}
