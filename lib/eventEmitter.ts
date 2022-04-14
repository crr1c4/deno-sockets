export type EventFunction<T> = (data: T) => void;

interface Event<T> {
  [eventName: string]: EventFunction<T>[];
}

export class EventEmmiter<T> {
  private events: Event<T>;

  constructor() {
    this.events = {};
  }

  on(name: string, listener: (data: T) => void): void {
    if (!this.events[name]) this.events[name] = [];
    this.events[name] = [...this.events[name], listener];
  }

  removeEventListener(name: string, listenerToRemove: (data: T) => void): void {
    if (!this.events[name]) throw new Error(`Can't remove a listener, Event ${name} doesn't exists.`);
    this.events[name] = this.events[name].filter((listener) => listener !== listenerToRemove);
  }

  emit(name: string, data: T) {
    if (!this.events[name]) throw new Error(`Can't emit an event. Event ${name} doesn't exist`);
    this.events[name].forEach((callback) => callback(data));
  }
}
