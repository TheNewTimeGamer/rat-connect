import * as net from 'net';

const tunnels: Tunnel[] = [];

class Tunnel {

    public readonly name: string;

    public readonly srcPort: number;

    public readonly destHost: string;
    public readonly destPort: number;

    public readonly server: net.Server;

    public readonly sockets: TunnelSocket[] = [];

    private accepting: boolean = false;

    constructor(name: string, srcPort: number, destHost: string, destPort: number) {
        this.name = name;

        this.srcPort = srcPort;
        this.destPort = destPort;
        this.destHost = destHost;

        this.server = net.createServer((srcSocket: net.Socket)=>{this.onConnect(srcSocket)});
    }

    private onConnect(srcSocket: net.Socket) {
        console.log('New connection:', this.srcPort, ' -> ', this.destHost, ':', this.destPort);
        const destSocket = net.createConnection({
            host: this.destHost,
            port: this.destPort
        },()=>{
            const tunnel: TunnelSocket = new TunnelSocket(srcSocket, destSocket);
            this.sockets.push(tunnel);
            
            srcSocket.on('data', (data: string | Uint8Array)=>{this.onData(destSocket, data)});
            srcSocket.on('disconnect', (data: string | Uint8Array)=>{this.onDisconnect(tunnel)});

            destSocket.on('data', (data: string | Uint8Array)=>{this.onData(srcSocket, data)});
            destSocket.on('disconnect', (data: string | Uint8Array)=>{this.onDisconnect(tunnel)});
        })
    }

    private onDisconnect(tunnel: TunnelSocket) {
        tunnel.destroy();
    }

    private onData(target: net.Socket, data: string | Uint8Array) {
        target.write(data);
    }

    public isAccepting(): boolean {
        return this.accepting;
    }

    public open(onSuccess: any, onError: any) {
        console.log('Tunnel \'' + this.name + '\' on port:', this.srcPort, 'listening for new connections.');
        this.server.on('error', onError);
        this.server.listen(this.srcPort, ()=>{
            this.accepting = true;
            onSuccess();
        });
    }

    public close() {
        this.server.close(()=>{
            console.log('Tunnel \'' + this.name + '\' on port:', this.srcPort, 'destroyed.');
        });
        this.accepting = false;
        console.log('Tunnel \'' + this.name + '\' on port:', this.srcPort, 'closed to new connections.');
    }

    public destroy() {
        this.close();
        this.disconnectAll();
    }

    public disconnect(socket: TunnelSocket) {
        const index: number = this.sockets.indexOf(socket);
        this.sockets.splice(index, 1)[0].destroy();
    }

    public disconnectAll() {
        while(this.sockets.length > 0) {
            this.sockets.pop()?.destroy();
        }
    }

}

class TunnelSocket {

    public readonly srcSocket: net.Socket;
    public readonly destSocket: net.Socket;

    constructor(srcSocket: net.Socket, destSocket: net.Socket) {
        this.srcSocket = srcSocket;
        this.destSocket = destSocket;
    }

    public destroy() {
        this.srcSocket.destroy();
        this.destSocket.destroy();
    }

}

export default Tunnel;
export { TunnelSocket, tunnels }