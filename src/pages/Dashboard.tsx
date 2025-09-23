import React from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button
} from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome to DriverHub Dashboard
          </Typography>
          <Typography paragraph>
            This is the React version of the DriverHub application. 
            For the full functionality with GPS tracking, photo sharing, and social features,
            please use the standalone HTML version.
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
