import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import image from "../images/fitsync-pro1.png"
const GetStartedPage = () => {
  return (
    <div style={{paddingBottom:'50px'}}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
        // bgcolor="#F0F4F8"
        position="relative"
      >
        <Box
          sx={{
            width: "100%",
            height: "2rem",
            backgroundColor: "rgb(246, 246, 241)",
            marginBottom: "2rem",
            paddingTop: "1rem"
          }}
        />
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{ padding: "2rem", margin: "0 auto", position: "relative" }}
          >
            <Typography variant="h2" component="header" gutterBottom>
              Get Started with Fitsync-Pro
            </Typography>
            <Box mb={4}>
              <Card>
                <CardMedia
                  component="img"
                  lenght="300"
                  image={image}
                  alt="Fitsync-Pro"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Achieve your fitness goals with Fitsync-PRO
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box mb={4}>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Fitness Journey Begins Here
              </Typography>
              <Typography variant="body1">
                Fitsync-PRO is your ultimate fitness companion. Whether you are
                a beginner or a seasoned athlete, we have the tools and programs
                to help you reach your fitness goals.
              </Typography>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" component="h3" gutterBottom>
                Why Choose Fitsync-Pro?
              </Typography>
              <Typography variant="body1">
                - Personalized fitness plans
                <br />
                - Progress tracking
                <br />
                - Expert advice and support
                <br />
                - Community of like-minded individuals
                <br />- And much more!
              </Typography>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" component="h3" gutterBottom>
                Get Started in 3 Easy Steps
              </Typography>
              <Typography variant="body1">
                1. Sign Up
                <br />
                2. Set Your Goals
                <br />
                3. Start Your Fitness Journey
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              href="/signUp"
              color="primary"
              sx={{
                bottom: 20,
                backgroundColor: '#46563C',
                '&:hover': {
                    color: 'white',
                    backgroundColor: '#869F76' } }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};
export default GetStartedPage;