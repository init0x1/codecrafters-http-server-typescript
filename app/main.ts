import * as net from "net";


interface HttpRequestUrl {
  method:string,
  path:string
}

function parseHttpRequest(data:Buffer):HttpRequestUrl{
  const httpRequest = data.toString().split('\r\n');
  const requestLine = httpRequest[0].split(' ');
  const method = requestLine[0];
  const path = requestLine[1]; 
  return {
    method,
    path
  }
} 


function createResponse (method:string, path:string):string{
     
  if( method === "GET" && path === "/"){
    return 'HTTP/1.1 200 OK\r\n\r\n';
  }else{
     return 'HTTP/1.1 404 Not Found\r\n\r\n'
  }
}

const server = net.createServer((socket: net.Socket) => {
  socket.on("data",(data:Buffer)=>{

    const {method,path} = parseHttpRequest(data);
    const response = createResponse(method,path);
     socket.write(Buffer.from(response))
  })






  socket.on("close", () => {
    socket.end();
  });
});


const PORT = 4221;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
 });
