import http from "node:http";
import server_config from "./config.json" with {type: "json"};
import round_robin from "./round_robin.js";
import least_connection from "./least_connection.js";

const servers = server_config.servers.map(server => ({
    ...server,
    connections: 0
}));

const load_balancing_algorithm = "Least_Connections";

const server = http.createServer((req, res) => {
    if (load_balancing_algorithm === "Round_Robin") {
        round_robin(servers, req, res);
    }
    else if (load_balancing_algorithm === "Least_Connections") {
        least_connection(servers, req, res);
    }
    else {
        res.writeHead(500);
        res.end("Load Balancing Algorithm is not supported");
    }
});

server.listen(3000, () => {
    console.log("Load Balancing server is listening at port: 3000");
})
