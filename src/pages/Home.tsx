import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const onGetStarted = () => {
    console.log('Get Started clicked');
    navigate('/user');
  }
  return (
    <div className="home">
      <h1>Welcome to Collaborators</h1>
      <p> A web application that allows teams to vote on tickets or ideas using fibonaci numbers. The application is designed to help teams make decisions and prioritize tasks.</p>
      <button onClick={onGetStarted}>Get Started</button>
    </div>
  )
}

export default Home