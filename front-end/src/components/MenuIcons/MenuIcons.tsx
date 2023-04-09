import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "./MenuIcons.css";
import { Stack } from '@mui/material';

interface MyPropsMenuIcons {
    iconMenu: React.ReactNode,
    typeContent: string
}

export default function MenuIcons(props: MyPropsMenuIcons) {
    /*  */
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {props.iconMenu}
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: '29%',
                        p: 1,
                        paddingTop: '0px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* check type */}
                {
                    props.typeContent === "notification" ?
                        <>
                            Notificate
                        </> : props.typeContent === "cart" ?
                            <>
                                <Stack className='header_modal-menuIcon' direction="row" justifyContent={'space-between'} spacing={1} mr={1}>
                                    <p>View Cart</p>
                                    <p>Checkout</p>
                                </Stack>

                                <Stack className='wrapp_item_boxModal' direction="row" justifyContent={'space-between'} spacing={1} mt={2} mr={1}>
                                    <Stack direction="row" justifyContent={'space-between'} spacing={1} >
                                        <p className='imgItemCart'>
                                            <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-04.jpg' />
                                        </p>

                                        <div className='content_ItemCart'>
                                            <h1>Learn Angular...</h1>
                                            <p>By Dave Franco</p>
                                            <p><b style={{ color: 'red' }}>$200</b>$99.00</p>
                                        </div>
                                    </Stack>
                                    <button className='btn-remove-cart'>Remove</button>
                                </Stack>
                            </> : props.typeContent === "loveProduct" ?
                                <>
                                    <Stack className='header_modal-menuIcon' direction="row" justifyContent={'space-between'} spacing={1} mr={1}>
                                        <p>View Cart</p>
                                        <p>Checkout</p>
                                    </Stack>

                                    <Stack className='wrapp_item_boxModal' direction="row" justifyContent={'space-between'} spacing={1} mt={2} mr={1}>
                                        <Stack direction="row" justifyContent={'space-between'} spacing={1} >
                                            <p className='imgItemCart'>
                                                <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-04.jpg' />
                                            </p>

                                            <div className='content_ItemCart'>
                                                <h1>Learn Angular...</h1>
                                                <p>By Dave Franco</p>
                                                <p><b style={{ color: 'red' }}>$200</b>$99.00</p>
                                            </div>
                                        </Stack>
                                        <button className='btn-remove-cart'>Remove</button>
                                    </Stack>
                                </> : props.typeContent === "chat" ? <>chat</> : <>
                                    notification
                                </>
                }

            </Menu>
        </>
    )
}
