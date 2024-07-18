import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8080'; // Địa chỉ của server, có thể thay đổi tùy theo cấu hình của bạn

export const socket: Socket = io(SOCKET_URL);
