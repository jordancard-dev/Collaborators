import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebSocket } from '../../context/WebSocketContext';
import { useState } from 'react';

type Props = {}
interface RoomParams extends Record<string, string | undefined> {
  id: string;
}

const Room = (props: Props) => {
  const { id } = useParams<RoomParams>() || '';
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>();
  const { messages, sendMessage } = useWebSocket();
  return (
    <>
      <h2>Create or Join a Room</h2>
      <p>Feel free to join a room using its room id or joining via sharable link.</p>
      <p>If you have neither create a room to collab in!</p>
      <p>{messages}</p>
      <motion.div>
        <div>
          <button>Create</button>
        </div>
        <div>
          <input type="text" placeholder="Room ID" value={id} />
          <button>Join</button>
        </div>
      </motion.div>
    </>

  )
}

export default Room