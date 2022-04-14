import { EventEmmiter, EventFunction } from "./eventEmitter.ts";

interface Message {
  username: string;
  message: string;
}

interface MessageHistory {
  in: Message[];
  out: Message[];
}

export class Socket<T> {
  private port: number;
  private hostname: string;
  private socket: Deno.TcpConn | null = null;
  private socketEvents: EventEmmiter<T> = new EventEmmiter();
  private history: MessageHistory = {
    in: [],
    out: [],
  };

  set onData(f: EventFunction<T>) {
    this.socketEvents.on("data", f);
  }

  constructor({ hostname, port }: { hostname: string; port: number }) {
    this.hostname = hostname;
    this.port = port;
  }

  async connect(): Promise<void> {
    this.socket = await Deno.connect({ hostname: this.hostname, port: this.port, transport: "tcp" }); 
  }

  async write(message: Message): Promise<void> {
    this.history.out = [...this.history.out, message];
    await this.socket?.write(new TextEncoder().encode(JSON.stringify(message)));
  }
}

// TODO: Add _response to history.out