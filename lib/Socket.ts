import { EventEmmiter, EventFn } from "./EventEmitter.ts";

export class Socket {
  private port: number;
  private hostname: string;
  private events: EventEmmiter = new EventEmmiter();

  constructor({ hostname, port }: { hostname: string, port: number }) {
    this.hostname = hostname;
    this.port = port;
  }

  set onData(fn: EventFn) {
    this.events.on("data", fn);
  }

  async write(message: string): Promise<void> {
    const connection = await Deno.connect({ hostname: this.hostname, port: this.port, transport: "tcp" });
    await connection.write(new TextEncoder().encode(message));
    const buffer = new Uint8Array(1024);
    await connection.read(buffer);
    const response = new TextDecoder().decode(buffer);
    this.events.emit("data", response);
    connection.close();
  }
}

// TODO: Add _response to history.out
