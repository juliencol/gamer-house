import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function useFetch<T>(defaultResponse: T, defaultRequest?: AxiosRequestConfig) {
  const [request, setRequest] = useState<AxiosRequestConfig | undefined>(defaultRequest);
  const [data, setData] = useState<T>(defaultResponse);
  const [someError, setSomeError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(defaultRequest ? false : false);

  useEffect(() => {
    if (request) {
      setIsLoading(true);
      axios(request)
        .then((res) => setData(res.data))
        .catch((err) => setSomeError(true))
        .then(() => setIsLoading(false));
    }
  }, [request]);

  return { data, someError, isLoading, setRequest };
}

export default useFetch;
