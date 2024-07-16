
import { ThemeProvider, createTheme, styled } from '@mui/material';

// Define your theme
const theme = createTheme();

const StyledLayout = styled('div')({
  minHeight: '100vh', 
  backgroundColor: 'rgb(246, 246, 241)'
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledLayout>
        {children}
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;