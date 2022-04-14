import { EventEmmiter, EventFunction } from "./eventEmitter.ts";

interface Message {
  username: string;
  message: string;
}

// interface MessageHistory {
//   in: Message[];
//   out: Message[];
// }

export class Socket<T> {
  private port: number;
  private hostname: string;
  private socketEvents: EventEmmiter = new EventEmmiter();
  // private history: MessageHistory = {
  //   in: [],
  //   out: [],
  // };

  set onData(f: EventFunction) {
    this.socketEvents.on("data", f);
  }

  constructor({ hostname, port }: { hostname: string; port: number }) {
    this.hostname = hostname;
    this.port = port;
  }

  async write(message: Message): Promise<void> {
    const connection = await Deno.connect({ hostname: this.hostname, port: this.port, transport: "tcp" });
    await connection.write(new TextEncoder().encode(JSON.stringify(message)));
    const buffer = new Uint8Array(1024);
    await connection.read(buffer);
    const response = new TextDecoder().decode(buffer);
    this.socketEvents.emit("data", response);
  }
}

// TODO: Add _response to history.out
