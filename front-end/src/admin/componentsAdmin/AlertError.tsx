import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface MyProps {
    messageError: String 
}

export default function AlertError(props: MyProps) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{props.messageError}!</Alert>
        </Stack>
    );
}