export default class InitServer {
  private port: number;
  private hostname: string;

  constructor({ hostname, port }: { hostname: string; port: number }) {
    this.hostname = hostname;
    this.port = port;
  }

  // TODO: extands prtoperies
}
