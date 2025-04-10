import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateJoinUser from '../../components/CreateJoinUser';
import { useWebSocket } from '../../context/WebSocketContext';

interface UserParams extends Record<string, string | undefined> {
  id?: string;
}

type Props = {
  onSubmit?: (message: string) => void;
}

const User = (props: Props) => {
  const { id } = useParams<UserParams>() || '';
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | undefined>(id);
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