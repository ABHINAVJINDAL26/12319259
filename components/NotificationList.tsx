'use client';

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
} from '@mui/material';
import { Notification } from '@/lib/api';
import { NotificationCard } from './NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  error?: string | null;
  page?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading = false,
  error = null,
  page = 1,
  onPageChange,
  itemsPerPage = 9,
}) => {
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedNotifications = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (notifications.length === 0) {
    return (
      <Alert severity="info">
        No notifications found.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Showing {displayedNotifications.length} of {notifications.length} notifications
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {displayedNotifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
          />
        ))}
      </Grid>

      {totalPages > 1 && (
        <Stack sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => onPageChange?.(newPage)}
            color="primary"
            size="large"
          />
        </Stack>
      )}
    </Box>
  );
};
