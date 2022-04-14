const decoder = new TextDecoder();
const encoder = new TextEncoder();

const server = Deno.listen({ port: 8080, transport: "tcp" });
console.log("Server on 127.0.0.1:8080");

for await (const connection of server) {
  const remoteAddres = connection.remoteAddr;
  console.log("New connection from ", remoteAddres);

  const buf = new Uint8Array(1024);
  await connection.read(buf);

  const data = decoder.decode(buf);
  console.log(`Received: ${data}\n`);

  connection.write(new TextEncoder().encode(JSON.stringify({"response": "Response from server"})));
}

export {};



// TODO: create class and methods