'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Stack, Chip, Grid, Divider } from '@mui/material';
import { Notification, fetchPriorityNotifications } from '@/lib/api';
import { FilterBar } from '@/components/FilterBar';
import { NotificationList } from '@/components/NotificationList';
import Log from '@/lib/logger';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [topN, setTopN] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Log("frontend", "info", "page", "Priority NotificationList component mounted");
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPriorityNotifications(topN);
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch priority notifications');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [topN]);

  useEffect(() => {
    let filtered = notifications;

    if (selectedType !== 'all') {
      filtered = notifications.filter(n => n.Type === selectedType);
    }

    setFilteredNotifications(filtered);
    setPage(1);
    Log("frontend", "info", "page", `Priority filter changed to ${selectedType}`);
  }, [notifications, selectedType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleTopNChange = (n: number) => {
    setTopN(n);
  };

  const handleReset = () => {
    setSelectedType('all');
    setTopN(10);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Paper
        sx={{
          mb: 3.5,
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 5,
          background:
            'linear-gradient(135deg, rgba(7,31,52,0.98), rgba(15,76,129,0.94) 58%, rgba(197,139,44,0.94))',
          color: '#fff',
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 22%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Chip
              icon={<WorkspacePremiumRoundedIcon />}
              label="Priority Inbox"
              sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.16)' }}
            />
            <Chip
              icon={<SpeedRoundedIcon />}
              label={`Top ${topN}`}
              sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </Stack>
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              Ranked to surface what matters most.
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 820, color: 'rgba(255,255,255,0.82)' }}>
              Placement updates stay on top, followed by Results and Events, so the most important campus information is visible first.
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              { label: 'Sort logic', value: 'Type + recency', icon: <AutoGraphRoundedIcon fontSize="small" /> },
              { label: 'Top N', value: `${topN} items`, icon: <SpeedRoundedIcon fontSize="small" /> },
              { label: 'Priority', value: 'Placement first', icon: <WorkspacePremiumRoundedIcon fontSize="small" /> },
            ].map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: 'rgba(255,255,255,0.16)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                  }}
                >
                  <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                    {item.icon}
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h6" sx={{ lineHeight: 1.15 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>

      <FilterBar
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        topN={topN}
        onTopNChange={handleTopNChange}
        onReset={handleReset}
      />

      <Divider sx={{ mb: 3, borderColor: 'rgba(15,76,129,0.08)' }} />

      <NotificationList
        notifications={filteredNotifications}
        loading={loading}
        error={error}
        page={page}
        onPageChange={setPage}
      />
    </Container>
  );
}
