import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


interface MyPropsSuccess {
  messageSuccess: String
}

export default function AlertSuccess(props: MyPropsSuccess) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{props.messageSuccess}!</Alert>
    </Stack>
  );
}