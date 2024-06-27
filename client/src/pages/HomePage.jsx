
import WelcomeComponent from "../components/WelcomeComponent";
import { styled } from '@mui/material/styles';

const WelcomeDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

function HomePage() {
    return (
    <WelcomeDiv>
    <WelcomeComponent />
    </WelcomeDiv>
    );
  }

  export default HomePage;