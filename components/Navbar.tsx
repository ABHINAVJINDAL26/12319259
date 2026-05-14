'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}
          >
            📬 Campus Notifications
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              href="/"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              All Notifications
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/priority"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              ⭐ Priority
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
