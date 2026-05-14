'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Notification, fetchPriorityNotifications } from '@/lib/api';
import { FilterBar } from '@/components/FilterBar';
import { NotificationList } from '@/components/NotificationList';
import Log from '@/lib/logger';

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          ⭐ Priority Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your most important notifications ranked by type and recency. Placements first, then Results, then Events.
        </Typography>
      </Box>

      <FilterBar
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        topN={topN}
        onTopNChange={handleTopNChange}
        onReset={handleReset}
      />

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
