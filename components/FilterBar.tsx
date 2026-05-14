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
} from '@mui/material';

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
    <Box
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        mb: 3,
        boxShadow: 1,
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Notification Type</InputLabel>
          <Select
            value={selectedType}
            label="Notification Type"
            onChange={(e) => onTypeChange?.(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Placement">💼 Placement</MenuItem>
            <MenuItem value="Result">📊 Result</MenuItem>
            <MenuItem value="Event">📅 Event</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Show Top N"
          type="number"
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: 1, max: 100 } }}
          value={topN}
          onChange={(e) => onTopNChange?.(parseInt(e.target.value) || 10)}
          sx={{ minWidth: 150 }}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={onReset}
          sx={{ minWidth: 120 }}
        >
          Reset Filters
        </Button>
      </Stack>
    </Box>
  );
};
