import Tunnel, { tunnels } from '@/tunneling/Tunnel';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    switch(request.method) {
        case 'GET':
            getTunnel(request, response);
            return;
        case 'DELETE':
            deleteTunnel(request, response);
            return;
    }
    response.setHeader('Content-Type', 'application/json');
    response.status(405).send(JSON.stringify([]));
}

const getTunnel = (request: NextApiRequest, response: NextApiResponse) => {
    const tunnel = tunnels.find((tunnel: Tunnel) => { return tunnel.name == request.query.name });
    if (!tunnel) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify([]));
        return;
    }
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify([tunnel]));
};

const deleteTunnel = (request: NextApiRequest, response: NextApiResponse) => {
    const index = tunnels.findIndex((tunnel: Tunnel) => { return tunnel.name === request.query.name });
    if (index < 0) {
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify([]));
        return;
    }
    tunnels.splice(index, 1)[0].destroy();
    
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(tunnels));
};