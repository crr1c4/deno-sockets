import { EventEmmiter, EventFn } from "./eventEmitter.ts";

export class Server {
  private port: number;
  private hostname: string;
  private events: EventEmmiter = new EventEmmiter();

  constructor({ hostname, port }: {hostname: string; port: number}) {
    this.hostname = hostname; 
    this.port = port;
  }

  async listen(): Promise<void> {
    const server = Deno.listen({
      port: this.port,
      hostname: this.hostname,
      transport: "tcp"
    });

    for await (const connection of server) {
      const buffer = new Uint8Array(1024);
      await connection.read(buffer);
      const data = new TextDecoder().decode(buffer);
      this.events.emit("connection", data);
    }
  }

  set onConnection (fn: EventFn) {
    this.events.on("connection", fn);
  }
}