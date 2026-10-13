import httpProxy from "http-proxy";

const proxy = httpProxy.createProxy({});

proxy.on("error", function(err, req, res) {
    if (!res.headersSent) res.writeHead(502);
    res.end("Bad Gateway");
})

function pick_best_server(servers) {
    let best = null;

    for (const server of servers) {
        if (server.weight <= 0) continue;
        if (best === null) {
            best = server;
            continue;
        }

        const lhs = server.connections * best.weight; // s.conns / s.weight
        const rhs = best.connections * server.weight; // best.conns / best.weight

        if (lhs < rhs || (lhs === rhs && server.weight > best.weight)) best = server;
    }

    return best;
}

const weighed_least_connection = (servers, req, res) => {
    const target = pick_best_server(servers);
    if (!target) {
        res.writeHead(503);
        return res.end("No servers available");
    }

    target.connections++;
    console.log("Target: ", target);
    res.on("close", () => {
        target.connections--;
    })

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
};

export default weighed_least_connection;