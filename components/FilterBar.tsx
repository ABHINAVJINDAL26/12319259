'use client';

import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  TextField,
  Paper,
  Typography,
  Chip,
} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

interface FilterBarProps {
  selectedType?: string;
  onTypeChange?: (type: string) => void;
  topN?: number;
  onTopNChange?: (n: number) => void;
  onReset?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedType = 'all',
  onTypeChange,
  topN = 10,
  onTopNChange,
  onReset,
}) => {
  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 3 },
        mb: 3.5,
        borderRadius: 4,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(247,249,252,0.9))',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2.25}
        sx={{ alignItems: { md: 'center' } }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.25, alignItems: 'center' }}>
            <TuneRoundedIcon color="primary" />
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Filter Controls
            </Typography>
            <Chip label={selectedType === 'all' ? 'All types' : selectedType} size="small" sx={{ ml: 1 }} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Refine the feed by notification type and the number of priority items.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ minWidth: { md: 620 } }}>
          <FormControl fullWidth>
            <InputLabel>Notification Type</InputLabel>
            <Select
              value={selectedType}
              label="Notification Type"
              onChange={(e) => onTypeChange?.(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Show Top N"
            type="number"
            slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: 1, max: 100 } }}
            value={topN}
            onChange={(e) => onTopNChange?.(parseInt(e.target.value) || 10)}
            sx={{ minWidth: { xs: '100%', sm: 170 } }}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={onReset}
            sx={{ minWidth: { xs: '100%', sm: 154 }, boxShadow: '0 10px 24px rgba(197,139,44,0.32)' }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
