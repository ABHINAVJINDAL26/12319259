'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import Link from 'next/link';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export const Navbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(18px)',
        backgroundColor: 'rgba(7, 31, 52, 0.78)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 76, gap: 2, py: 1 }}>
          <Stack direction="row" spacing={1.5} sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06))',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <NotificationsActiveRoundedIcon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="h6" component="div" sx={{ color: '#fff', lineHeight: 1.1 }}>
                  Campus Notifications
                </Typography>
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Priority Inbox"
                  size="small"
                  sx={{
                    color: '#fff',
                    bgcolor: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    '& .MuiChip-icon': { color: '#e7b85d' },
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                Clean campus feed with priority sorting and type filters
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button
              color="inherit"
              component={Link}
              href="/"
              variant="text"
              sx={{ color: '#fff', px: 2.2 }}
            >
              All Notifications
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/priority"
              variant="contained"
              sx={{
                bgcolor: 'secondary.main',
                color: '#1c1407',
                boxShadow: '0 8px 24px rgba(197, 139, 44, 0.35)',
                '&:hover': { bgcolor: 'secondary.light' },
              }}
            >
              Priority
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
