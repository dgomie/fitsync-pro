
import WelcomeComponent from "../components/WelcomeComponent";
import { styled } from '@mui/material/styles';
import GetStartedPage from "../components/GetStarted";
import { useRef } from 'react';
import Hero from '../components/HeroComponent';


const WelcomeDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  marginTop: '10rem',
  backgroundColor: 'rgb(246, 246, 241)'
});


function HomePage() {
  const getStartedRef = useRef(null);
  const scrollToGetStarted = () => {
    getStartedRef.current?.scrollIntoView({ behavior: 'smooth' });

  };
    return (
      <>
      <Hero scrollToGetStarted={scrollToGetStarted}/>
    <WelcomeDiv>
    <WelcomeComponent/>
    </WelcomeDiv>
    <div ref={getStartedRef}>
        <GetStartedPage />
      </div>
    </>
    );
  }

  export default HomePage;