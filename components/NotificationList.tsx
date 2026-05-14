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
  Paper,
  Skeleton,
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
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          minHeight: 420,
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Loading notifications
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper sx={{ p: 2.25, borderRadius: 4 }}>
                  <Skeleton variant="text" width="48%" height={30} />
                  <Skeleton variant="text" width="72%" />
                  <Skeleton variant="rectangular" height={84} sx={{ borderRadius: 2, mt: 1.5 }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4, borderColor: 'rgba(211,47,47,0.18)' }}>
        <Alert severity="error" sx={{ borderRadius: 3, alignItems: 'center' }}>
          {error}
        </Alert>
      </Paper>
    );
  }

  if (notifications.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(247,249,252,0.88))',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          No notifications found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting the filter or increasing the Top N value to see more results.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper
        sx={{
          mb: 3,
          px: 2.5,
          py: 1.75,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            {displayedNotifications.length} visible notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {displayedNotifications.length} of {notifications.length} total records across pages
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Click a card to mark it as viewed
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {displayedNotifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
          />
        ))}
      </Grid>

      {totalPages > 1 && (
        <Paper
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 999,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => onPageChange?.(newPage)}
            color="primary"
            size="large"
            siblingCount={1}
            boundaryCount={1}
          />
        </Paper>
      )}
    </Box>
  );
};
