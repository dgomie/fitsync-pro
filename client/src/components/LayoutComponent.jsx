
import { ThemeProvider, createTheme, styled } from '@mui/material';

// Define your theme
const theme = createTheme();

// Create a styled component for full-screen layout
const StyledLayout = styled('div')({
  minHeight: '100vh',  // Ensures the layout covers the entire viewport height
  backgroundColor: 'rgb(246, 246, 241)'  // Sets the background color
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