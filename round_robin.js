import httpProxy from "http-proxy";

const proxy = httpProxy.createProxy({});

let current = 0;

const round_robin = (servers, req, res) => {
    const target = servers[current];
    console.log(target);
    current = (current + 1) % servers.length;
    console.log("current: ", current);

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
};

export default round_robin;