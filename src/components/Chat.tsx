import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useCallback, useEffect, useRef, useState } from "react"
import createSocket from "../utils/socketConnection"
import { useSelector } from "react-redux"
import type { RootState } from "../utils/appStore"
import { useParams } from "react-router"
import axios from "axios";

interface ChatMessage {
    senderId: { _id: string, firstName: string },
    text: string,
    createdAt: string,
    updatedAt: string
}

const Chat = () => {
    const { targetUserId } = useParams()
    const [messsages, setMessages] = useState<ChatMessage[]>([])
    const [newMessage, setNewMessage] = useState<string>("");
    const user = useSelector((state: RootState) => state.user)
    const userId = user?._id;
    const socketRef = useRef<any>(null)
    const divRef = useRef<HTMLDivElement>(null)

    const sendMessage = () => {
        if (!newMessage) return
        const value = newMessage.trim()
        socketRef.current.emit("sendMessage", {
            firstName: user?.firstName,
            userId,
            targetUserId,
            text: value
        })
        setNewMessage('')
    }
    const getPrevChats = useCallback(async (targetUserId: string) => {
        if (!targetUserId || !userId) return;
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/get-chat-history`, { targetUserId }, { withCredentials: true });

            if (res.data) {
                setMessages(res.data)
            }

        } catch (err) {
            console.error(err)
        }
    }, [userId])


    useEffect(() => {
        if (!userId) { return };
        const socket = createSocket();
        socketRef.current = socket
        socketRef.current.emit("joinChat", { userId, targetUserId });

        socketRef.current.on("messageRecived", ({ firstName, text, senderId }: {firstName: string, text: string, senderId: string}) => {
            setMessages((prev) => [...prev,
            {
                senderId: { _id: senderId, firstName: firstName },
                text: text,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            ])
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [targetUserId, userId])

    useEffect(() => {
        if (targetUserId) {
            getPrevChats(targetUserId)
        }
    }, [getPrevChats, targetUserId])

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current?.scrollHeight
        }
    },[messsages])


    return (
        <div className="rounded-2xl w-1/2 mx-auto mt-10 bg-gray-400">
            <h1 className="p-4 border-b-2 text-2xl text-white font-bold">Chat</h1>

            <div className="h-100 border-b-1 mb-2 bg-gray-100 rounded-b-lg overflow-y-scroll scrollbar-hide" ref={divRef}>
                {messsages.length ? messsages?.map((msg, index) =>
                    <div key={index} className={`chat ${msg.senderId?._id == userId  ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-header">{msg?.senderId?.firstName}</div>
                        <div className={`chat-bubble ${msg.senderId?._id == userId  ? 'chat-bubble-info rounded-bl-2xl' : 'chat-bubble-error rounded-br-2xl'} rounded-t-2xl  break-words whitespace-normal`}>{msg.text}</div>
                    </div>
                ) : <h3 className="text-xl flex justify-center opacity-30">Start Conversation</h3>}
            </div>
            <div className="w-full flex gap-2 justify-center pb-2">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="input w-7/8 rounded-4xl" />
                <button className="btn btn-secondary rounded-full" onClick={() => { sendMessage() }}><PaperAirplaneIcon className="h-5 w-8" /></button>
            </div>
        </div>
    )
}

export default Chat