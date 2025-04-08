import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [room, setRoom] = useState<any>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
            processMessage(event.data);

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SEND_MESSAGE',
                    payload: event.data
                });
            }

            navigator.serviceWorker.addEventListener('message', (event) => {
                console.log('Message from service worker', event.data);
                if (event.data.type === 'SEND_MESSAGE') {
                    setMessages((prev) => [...prev, event.data.payload]);
                    processMessage(event.data.payload);
                }
            });
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        return () => {
            ws.current?.close();
        };
    }, [url]);

    const processMessage = (message: string) => {
        console.log('message', message);
        const { action, payload: { roomName, users = [] } } = JSON.parse(message);
        console.log('action', action);
        console.log('users', users);
        switch (action) {
            case 'set-username':
                break;
            case 'create-room':
                break;
            case 'get-room':
                console.log('get-room', roomName, users);
                if (roomName)
                    setRoom({ roomName, users })
                break;
            case 'selections-cleared':
            case 'selections-revealed':
            case 'user-joined':
                setUsers(users);
                break;
            default:
                console.log('Unknown action');
                break;
        }
    }

    const sendMessage = (message: string) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.log('WebSocket is not open');
        }
    };

    return { messages, users, room, sendMessage };
};

export default useWebSocket;
