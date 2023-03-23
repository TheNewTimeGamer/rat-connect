import Tunnel, { tunnels } from '@/tunneling/Tunnel';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    switch (request.method) {
        case 'GET':
            getTunnels(request, response);
            return;
        case 'POST':
            postTunnel(request, response);
            return;
    }
    response.setHeader('Content-Type', 'application/json');
    response.status(405).send(JSON.stringify([]));
}

const getTunnels = (request: NextApiRequest, response: NextApiResponse) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(tunnels));
};

const postTunnel = (request: NextApiRequest, response: NextApiResponse) => {
    response.setHeader('Content-Type', 'application/json');
    const body = JSON.parse(request.body);
    if(!body.name || !body.srcPort || !body.destHost || !body.destPort) {
        response.status(400).send(JSON.stringify([]));
        return;
    }
    
    const tunnel: Tunnel = new Tunnel(body.name, parseInt(body.srcPort), body.destHost, parseInt(body.destPort));
    tunnel.open(()=>{
        tunnels.push(tunnel);
        response.status(200).send(JSON.stringify(tunnels));
    }, (error: any)=>{
        response.status(500).send(JSON.stringify([error]));
    });
};

