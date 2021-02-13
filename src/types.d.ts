interface WakeLock {
  request: (type: string) => Promise;
  release(): Promise;
}

interface Navigator {
  wakeLock: WakeLock;
}
