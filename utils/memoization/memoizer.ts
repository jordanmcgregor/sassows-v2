// type AsyncFn<T> = () => Promise<T>;

// const memoCache = new Map<string, unknown>();

// export function memoize<T>(key: string, fn: AsyncFn<T>): Promise<T> {
//   if (memoCache.has(key)) {
//     return Promise.resolve(memoCache.get(key) as T);
//   }

//   const result = fn().then((res) => {
//     memoCache.set(key, res);
//     return res;
//   });

//   memoCache.set(key, result); // store the pending promise to prevent duplicate calls
//   return result;
// }

type AsyncFn<T> = () => Promise<T>;

const memoCache = new Map<string, Promise<unknown>>();

export function memoize<T>(key: string, fn: AsyncFn<T>): Promise<T> {
  if (memoCache.has(key)) {
    return memoCache.get(key)! as Promise<T>; // safely cast
  }

  const result = fn().catch((err) => {
    memoCache.delete(key); // remove failed call to allow retry
    throw err;
  });

  memoCache.set(key, result);
  return result;
}

