export class SocketManager<T> {
    public readonly sockets = new Map<number, T>();

    private socketId = 0;

    public addSocket(socket: T) {
        this.sockets.set(this.socketId++, socket);
    }

    public getSocket(socketId: number) {
        return this.sockets.get(socketId);
    }
}