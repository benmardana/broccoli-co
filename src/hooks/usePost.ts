import { useState } from 'react';

const useSubmit = <T, V>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<V | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const post = (body?: T) => {
    void (async (body) => {
      setError(undefined);
      setIsLoading(true);
      setResponse(undefined);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          const errorJSON = (await response.json()) as { errorMessage: string };
          throw new Error(errorJSON.errorMessage);
        }
        setResponse((await response.json()) as V);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })(body);
  };

  return { post, isLoading, error, response } as const;
};

export default useSubmit;
