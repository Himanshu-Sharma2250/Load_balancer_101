import http from "node:http";
import server_config from "./config.json" with {type: "json"};

const create_server = (host, port, timeout) => {
    http.createServer((req, res) => {
        setTimeout(() => {
            res.writeHead(200);
            res.end(`Server response from port: ${port}`);
        }, timeout);
    }).listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}.`)
    })
};

server_config.servers.forEach(server => create_server(server.host, server.port, server.timeout));