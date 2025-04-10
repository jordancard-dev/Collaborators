
type CreateJoinUserProps = {
  onSubmit?: () => void;
  onChange?: (event: ChangeEvent) => void;
}
import { ChangeEvent } from 'react';
const CreateJoinUser = (props: CreateJoinUserProps) => {
  const MAX_CHARACTER = 20;
  const MIN_CHARACTER = 6;

  const disableBUtton = () => {
    const inputElement = document.getElementById('name') as HTMLInputElement;
    const userName = inputElement?.value || '';
    console.log('userName', userName);
    if (userName.length >= MIN_CHARACTER && userName.length <= MAX_CHARACTER) {
      return false;
    }

    return true;
  }
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" onChange={props.onChange} />
      <button disabled={disableBUtton()} onClick={props.onSubmit}>Save Username</button>
    </div>
  )
}

export default CreateJoinUser