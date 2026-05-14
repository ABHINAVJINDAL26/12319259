'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { Notification } from '@/lib/api';
import { getTypeColor, getTypeLabel } from '@/lib/priority';
import Log from '@/lib/logger';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const [isViewed, setIsViewed] = useState(true); // default true to avoid flicker of new
  
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("viewedNotifications") || "[]");
    setIsViewed(viewed.includes(notification.ID));
  }, [notification.ID]);

  const handleCardClick = async () => {
    if (!isViewed) {
      const viewed = JSON.parse(localStorage.getItem("viewedNotifications") || "[]");
      if (!viewed.includes(notification.ID)) {
        viewed.push(notification.ID);
        localStorage.setItem("viewedNotifications", JSON.stringify(viewed));
        setIsViewed(true);
        await Log("frontend", "info", "component", `Notification marked as viewed: ${notification.ID}`);
      }
    }
  };

  const date = new Date(notification.Timestamp);
  const typeColor = getTypeColor(notification.Type);
  const isNew = !isViewed;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: isNew ? 'pointer' : 'default',
          opacity: isNew ? 1 : 0.85,
          border: isNew ? '2px solid' : '1px solid',
          borderColor: isNew ? 'primary.main' : 'divider',
          backgroundColor: isNew ? 'rgba(25, 103, 210, 0.05)' : 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardHeader
          title={getTypeLabel(notification.Type)}
          subheader={date.toLocaleString()}
          action={
            <Chip
              label={isNew ? 'New' : 'Viewed'}
              color={isNew ? 'primary' : 'default'}
              size="small"
              variant={isNew ? 'filled' : 'outlined'}
            />
          }
          sx={{
            backgroundColor: isNew ? 'rgba(25, 103, 210, 0.1)' : 'transparent',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              lineHeight: 1.6,
              wordBreak: 'break-word',
            }}
          >
            {notification.Message}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Chip
              label={notification.Type}
              color={typeColor}
              size="small"
              variant="outlined"
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', marginTop: 1 }}
          >
            ID: {notification.ID.substring(0, 8)}...
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
