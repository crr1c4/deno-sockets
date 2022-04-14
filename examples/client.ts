import { Socket } from "../lib/Socket.ts";

const client = new Socket({ hostname: "127.0.0.1", port: 8000 });
await client.connect();
client.write({message: "Hello from client", username: "cr1c4"})
// const username = prompt("Username:") ?? "";
// const message = prompt(`${username}:`) ?? "";

// client.write({ username, message });

// const message2 = prompt(`${username}:`) ?? "";
// client.write({ username, message: message2 });

export {};

// https://www.youtube.com/watch?v=ln9qz-_bT2U