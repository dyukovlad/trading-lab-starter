type Listener = (...args: any[]) => void;

export class EventBus {
  private listeners = new Map<string, Listener[]>();

  on(event: string, cb: Listener) {
    const arr = this.listeners.get(event) ?? [];
    arr.push(cb);
    this.listeners.set(event, arr);
  }

  off(event: string, cb: Listener) {
    const arr = this.listeners.get(event) ?? [];
    this.listeners.set(
      event,
      arr.filter((f) => f !== cb)
    );
  }

  emit(event: string, ...args: any[]) {
    (this.listeners.get(event) ?? []).forEach((cb) => cb(...args));
  }
}

export const eventBus = new EventBus();
