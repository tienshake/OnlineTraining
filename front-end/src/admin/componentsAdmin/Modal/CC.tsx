import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';

const style = {
    position: 'absolute' as 'absolute',
    top: '25%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CC() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '65%' }}>
                    <h2 id="parent-modal-title">Chỉnh sửa thông tin</h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', /* justifyContent: 'space-between' */ marginTop: '20px', gap:'10px' }}>
                        <div style={{ width: '20%', background: '' }}>
                            <p>Name</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>Phone number</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>Address</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>About_me</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>avatar</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>Name</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>Name</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>

                        <div style={{ width: '20%', background: '' }}>
                            <p>Name</p>
                            <OutlinedInput sx={{ width: '100%' }} size='small' placeholder="Please enter text" />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
