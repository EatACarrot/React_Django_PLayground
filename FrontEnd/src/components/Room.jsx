import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Room({username}){
    const {roomName} = useParams();
    const [history, setHistory] = useState("")
    const [message, setMessage] = useState("")
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if(!roomName) return

        const ws = new WebSocket(`ws://localhost:8000/ws/SocketServer/${roomName}/`)
        setSocket(ws)

        ws.onopen = () =>{
            console.log(`connected to ${roomName}`)
        }

        ws.onmessage = (e) =>{
            const data  = JSON.parse(e.data)
            setHistory((prevHistory) => {
                return `${prevHistory}\n${data.username}: ${data.message}`
            })
            console.log("message:", data)
        }

        ws.onclose = () => {
            console.log("Socket closed")
        }

        return () => {
            ws.close()
        }
    },[roomName])

    const handleSubmit = (e) =>{
        e.preventDefault();

        socket.send(
            JSON.stringify({
                username,
                message,
            })
        )
        
        setMessage("")
    }

    return (<>
        <p style={{ whiteSpace: "pre-wrap" }}>{history}</p>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={message}
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    </>)
}