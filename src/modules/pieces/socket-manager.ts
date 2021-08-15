export class SocketManager<T> {
    public readonly sockets = new Map<number, T>();

    private socketId = 0;

    public addSocket(socket: T): void {
        this.sockets.set(this.socketId++, socket);
    }

    public getSocket(socketId: number): T {
        return this.sockets.get(socketId);
    }

    public getAll(): Map<number, T> {
        return this.sockets;
    }
}