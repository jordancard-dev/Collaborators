import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateJoinUser from '../../components/CreateJoinUser';
import { useWebSocket } from '../../context/WebSocketContext';

interface UserParams extends Record<string, string | undefined> {
  id?: string;
}
/**
 * Users page that manages the user creation and joining process.
 * It uses the WebSocket context to send messages to the server.
 * @returns User component
 */
const User = () => {
  const { id } = useParams<UserParams>() || '';
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>();
  const { sendMessage } = useWebSocket();

  const onChange = (event: ChangeEvent) => {
    const { value = '' } = event.target as HTMLInputElement;
    setUserName(value);
  }
  const onSubmit = async () => {
    const message = {
      "data": {
        "action": "set-username",
        "username": userName
      }
    };
    await sendMessage(JSON.stringify(message));
    navigate('/room');
  }
  return (
    <div>
      <div>{id ? id : "CREATE USER"}</div>
      <CreateJoinUser onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}

export default User