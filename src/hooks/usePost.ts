import { useState } from 'react';

const useSubmit = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const post = (body?: object) => {
    void (async (body) => {
      setError(undefined);
      setIsLoading(true);
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
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })(body);
  };

  return { post, isLoading, error } as const;
};

export default useSubmit;
