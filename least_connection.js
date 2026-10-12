import httpProxy from "http-proxy";

const proxy = httpProxy.createProxy({});

const least_connection = (servers, req, res) => {
    servers.sort((a, b) => a.connections - b.connections);

    const target = servers[0];
    target.connections++;
    console.log(target);

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });

    res.on('finish', () => {
        target.connections--;
    })
};

export default least_connection;