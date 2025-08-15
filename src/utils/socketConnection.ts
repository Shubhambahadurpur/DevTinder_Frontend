import { io } from "socket.io-client"

export default function createSocket () {
    return io(import.meta.env.VITE_BASE_URL)
}
