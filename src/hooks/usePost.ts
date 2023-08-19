import { useState } from 'react';

const useSubmit = <Payload, Response>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const _post = async (body?: Payload) => {
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
      setResponse((await response.json()) as Response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const post = (body?: Payload) => {
    void _post(body);
  };

  return { post, isLoading, error, response } as const;
};

export default useSubmit;
