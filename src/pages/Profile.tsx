import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Speed as SpeedIcon,
  Route as RouteIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  mr: 3
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ mt: 1 }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RouteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Distance</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {user.totalDistance.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                kilometers driven
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimerIcon sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Total Time</Typography>
              </Box>
              <Typography variant="h3" color="secondary">
                {user.totalTime.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                hours behind the wheel
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Average Speed</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {user.averageSpeed.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                km/h average
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Achievements
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="First Route"
                color="primary"
                variant="outlined"
              />
              <Chip
                label="Speed Demon"
                color="secondary"
                variant="outlined"
              />
              <Chip
                label="Long Distance"
                color="success"
                variant="outlined"
              />
              <Chip
                label="Social Driver"
                color="warning"
                variant="outlined"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
