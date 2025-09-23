import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar
} from '@mui/material';
import {
  Route as RouteIcon,
  Speed as SpeedIcon,
  Timer as TimerIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Route {
  id: string;
  name: string;
  locations: any[];
  startTime: number;
  endTime: number;
  totalDistance: number;
  averageSpeed: number;
  maxSpeed: number;
  isPublic: boolean;
  userId: string;
  username: string;
  likes: number;
  comments: number;
}

interface RouteCardProps {
  route: Route;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const duration = (route.endTime - route.startTime) / (1000 * 60 * 60); // Convert to hours

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
            {route.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary">
            {route.username}
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            {route.isPublic ? (
              <Chip icon={<PublicIcon />} label="Public" size="small" color="success" />
            ) : (
              <Chip icon={<LockIcon />} label="Private" size="small" color="default" />
            )}
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          {route.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {format(new Date(route.startTime), 'MMM dd, yyyy • HH:mm')}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            icon={<RouteIcon />}
            label={`${route.totalDistance.toFixed(1)} km`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<SpeedIcon />}
            label={`${route.averageSpeed.toFixed(0)} km/h avg`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<TimerIcon />}
            label={`${duration.toFixed(1)}h`}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Max Speed: {route.maxSpeed.toFixed(0)} km/h
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" color="error">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2">{route.likes}</Typography>
          
          <IconButton size="small" color="primary">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2">{route.comments}</Typography>
        </Box>

        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RouteCard;
