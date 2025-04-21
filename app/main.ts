import * as net from "net";
import { parseHttpRequest, router } from './handlers';


const server = net.createServer((socket: net.Socket) => {
  
  socket.on("data", (data: Buffer) => {
    try {
      const request = parseHttpRequest(data);
      const response = router(request);
      
      socket.write(Buffer.from(response));
    } catch (error) {
      console.error(`Error handling request: ${error}`);
      socket.write(Buffer.from('HTTP/1.1 500 Internal Server Error\r\n\r\n'));
    } finally {
      socket.end();
    }
  });

  socket.on("error", (error) => {
    console.error(`Socket error: ${error.message}`);
    socket.end();
  });
});

const PORT = 4221;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
