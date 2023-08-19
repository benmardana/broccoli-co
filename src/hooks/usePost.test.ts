import { act, renderHook, waitFor } from '@testing-library/react';
import usePost from './usePost';

describe('useTest', () => {
  test('intial state', () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => 'ok',
    });
    const { result } = renderHook(() => usePost(''));
    const { isLoading, error, response } = result.current;
    expect(isLoading).toBeFalsy();
    expect(error).toBeFalsy();
    expect(response).toBeFalsy();
  });

  test('should change loading state during post', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => 'ok',
    });
    const { result, rerender } = renderHook(() => usePost(''));
    const { post } = result.current;

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      post();
    });
    rerender();

    await waitFor(() => {
      expect(result.current.isLoading).toBeTruthy();
    });
  });

  test('should change error state after error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error());
    const { result, rerender } = renderHook(() => usePost(''));
    const { post } = result.current;

    expect(result.current.error).toBeFalsy();

    act(() => {
      post();
    });
    rerender();

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  test('should update response on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => 'ok',
    });
    const { result, rerender } = renderHook(() => usePost(''));
    const { post } = result.current;

    expect(result.current.isLoading).toBeFalsy();
    act(() => {
      post();
    });
    rerender();

    await waitFor(() => {
      expect(result.current.response).toBe('ok');
    });
  });
});
