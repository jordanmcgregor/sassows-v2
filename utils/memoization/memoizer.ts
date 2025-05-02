type AsyncFn<T> = () => Promise<T>;

const memoCache = new Map<string, unknown>();

export function memoize<T>(key: string, fn: AsyncFn<T>): Promise<T> {
  if (memoCache.has(key)) {
    return Promise.resolve(memoCache.get(key) as T);
  }

  const result = fn().then((res) => {
    memoCache.set(key, res);
    return res;
  });

  memoCache.set(key, result); // store the pending promise to prevent duplicate calls
  return result;
}
