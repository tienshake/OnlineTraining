import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <CircularProgress />
    </Box>
  );
}
