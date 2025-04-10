// context/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type WebSocketContextType = {
    messages: string[];
    sendMessage: (msg: string) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ws_URL = import.meta.env.VITE_WS_URL || '';
    const socket = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.current = new WebSocket(ws_URL);

        socket.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        return () => {
            socket.current?.close();
        };
    }, []);

    const sendMessage = async (msg: string) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(msg);
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) throw new Error("useWebSocket must be used within WebSocketProvider");
    return context;
};
