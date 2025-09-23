import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Speed as SpeedIcon,
  Route as RouteIcon
} from '@mui/icons-material';

interface Friend {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  totalDistance: number;
  totalRoutes: number;
  averageSpeed: number;
  status: 'pending' | 'accepted' | 'sent';
}

const Friends: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const friends: Friend[] = [
    {
      id: '1',
      username: 'SpeedRacer',
      email: 'speed@example.com',
      isOnline: true,
      totalDistance: 2500.5,
      totalRoutes: 15,
      averageSpeed: 72.3,
      status: 'accepted'
    },
    {
      id: '2',
      username: 'RoadWarrior',
      email: 'road@example.com',
      isOnline: false,
      totalDistance: 1800.2,
      totalRoutes: 12,
      averageSpeed: 68.7,
      status: 'accepted'
    },
    {
      id: '3',
      username: 'HighwayHero',
      email: 'highway@example.com',
      isOnline: true,
      totalDistance: 3200.8,
      totalRoutes: 22,
      averageSpeed: 75.1,
      status: 'pending'
    }
  ];

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const acceptedFriends = filteredFriends.filter(f => f.status === 'accepted');
  const pendingFriends = filteredFriends.filter(f => f.status === 'pending');

  const handleAddFriend = (friendId: string) => {
    console.log('Adding friend:', friendId);
  };

  const handleAcceptFriend = (friendId: string) => {
    console.log('Accepting friend:', friendId);
  };

  const handleRejectFriend = (friendId: string) => {
    console.log('Rejecting friend:', friendId);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Friends
      </Typography>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Friends List */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                My Friends ({acceptedFriends.length})
              </Typography>
            </Box>
            <List>
              {acceptedFriends.map((friend) => (
                <ListItem key={friend.id} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {friend.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {friend.username}
                        <Chip
                          label={friend.isOnline ? 'Online' : 'Offline'}
                          size="small"
                          color={friend.isOnline ? 'success' : 'default'}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {friend.totalDistance.toFixed(1)} km • {friend.totalRoutes} routes • {friend.averageSpeed.toFixed(1)} km/h avg
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      View Profile
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Pending Requests */}
          {pendingFriends.length > 0 && (
            <Paper sx={{ mt: 2 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  Pending Requests ({pendingFriends.length})
                </Typography>
              </Box>
              <List>
                {pendingFriends.map((friend) => (
                  <ListItem key={friend.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {friend.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.username}
                      secondary={`Wants to be friends`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="success"
                        onClick={() => handleAcceptFriend(friend.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRejectFriend(friend.id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>

        {/* Add Friends */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add Friends
            </Typography>
            <TextField
              fullWidth
              placeholder="Search by username or email"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => handleAddFriend('new')}
            >
              Send Friend Request
            </Button>
          </Paper>

          {/* Quick Stats */}
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Friend Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Total Friends:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {acceptedFriends.length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Online Now:</Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  {acceptedFriends.filter(f => f.isOnline).length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Pending:</Typography>
                <Typography variant="body2" fontWeight="bold" color="warning.main">
                  {pendingFriends.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Friends;
