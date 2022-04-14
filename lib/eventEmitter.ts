export type EventFn = (data: unknown) => void;

interface Event {
  [eventName: string]: EventFn[];
}

export class EventEmmiter {
  private events: Event;

  constructor() {
    this.events = {};
  }

  on(name: string, listener: EventFn): void {
    if (!this.events[name]) this.events[name] = [];
    this.events[name] = [...this.events[name], listener];
  }

  removeEventListener(name: string, listenerToRemove: EventFn): void {
    if (!this.events[name]) throw new Error(`Can't remove a listener, Event ${name} doesn't exists.`);
    this.events[name] = this.events[name].filter((listener) => listener !== listenerToRemove);
  }

  emit(name: string, data: unknown) {
    if (!this.events[name]) throw new Error(`Can't emit an event. Event ${name} doesn't exist`);
    this.events[name].forEach((callback) => callback(data));
  }
}
