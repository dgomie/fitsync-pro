
import WelcomeComponent from "../components/WelcomeComponent";
import { styled } from '@mui/material/styles';
import GetStartedPage from "../components/GetStarted";
import { useRef } from 'react';

const WelcomeDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});


function HomePage() {
  const getStartedRef = useRef(null);
  const scrollToGetStarted = () => {
    getStartedRef.current?.scrollIntoView({ behavior: 'smooth' });

  };
    return (
      <>
    <WelcomeDiv>
    <WelcomeComponent scrollToGetStarted={scrollToGetStarted}/>
    </WelcomeDiv>
    <div ref={getStartedRef}>
        <GetStartedPage />
      </div>
    </>
    );
  }

  export default HomePage;