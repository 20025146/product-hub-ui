
interface RequestIdleCallbackOptions {
  timeout: number;
}

interface Window {
  requestIdleCallback(
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ): number;
  cancelIdleCallback(handle: number): void;
}

interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}
