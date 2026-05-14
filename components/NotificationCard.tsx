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
  Avatar,
  Stack,
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
  const initials = notification.Type.slice(0, 1).toUpperCase();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(15, 76, 129, 0.1)',
          background:
            isNew
              ? 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,246,252,0.92))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(247,249,252,0.84))',
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          boxShadow: isNew ? '0 18px 40px rgba(15, 76, 129, 0.14)' : '0 10px 28px rgba(15, 31, 45, 0.08)',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(15, 76, 129, 0.28)',
            boxShadow: '0 24px 50px rgba(15, 76, 129, 0.16)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: isNew
              ? 'linear-gradient(135deg, rgba(15,76,129,0.1), rgba(197,139,44,0.05))'
              : 'linear-gradient(135deg, rgba(15,76,129,0.04), rgba(255,255,255,0))',
            pointerEvents: 'none',
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: isNew ? 'primary.main' : 'rgba(15,76,129,0.12)',
                color: isNew ? '#fff' : 'primary.main',
                fontWeight: 800,
              }}
            >
              {initials}
            </Avatar>
          }
          title={
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                {getTypeLabel(notification.Type)}
              </Typography>
              <Chip
                label={isNew ? 'New' : 'Viewed'}
                color={isNew ? 'primary' : 'default'}
                size="small"
                variant={isNew ? 'filled' : 'outlined'}
                sx={{ fontWeight: 700 }}
              />
            </Stack>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {date.toLocaleString()}
            </Typography>
          }
          action={
            <Chip
              label={notification.Type}
              color={typeColor}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 700 }}
            />
          }
          sx={{
            pb: 1,
            '& .MuiCardHeader-content': { minWidth: 0 },
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 0 }}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              lineHeight: 1.75,
              wordBreak: 'break-word',
              minHeight: 64,
            }}
          >
            {notification.Message}
          </Typography>
          <Box
            sx={{
              mt: 2.5,
              pt: 1.75,
              borderTop: '1px solid rgba(15, 76, 129, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              ID: {notification.ID.substring(0, 8)}...
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isNew ? 'Fresh notification' : 'Already viewed'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
