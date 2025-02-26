function throttle<T>(callback: (...args: T[]) => void, timeout = 200) {
  let cleanup: null | ReturnType<typeof setTimeout> = null;

  return (...args: T[]) => {
    if (!cleanup) {
      cleanup = setTimeout(() => {
        callback(...args);
        cleanup = null;
      }, timeout);
    }
  };
}

export default throttle;
