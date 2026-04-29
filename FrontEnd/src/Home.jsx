import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { Room } from "./components/Room"

export function Home ({username}){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/SocketServer/:roomName" element={<Room username={username}/>}/>
            </Routes>
        </BrowserRouter>
    )

}