import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./pagination.css"
import { Pagination, PaginationItem } from "@mui/material";

export default function PaginationRounded() {
    return (
        <Stack spacing={2}>
            <Pagination
                count={6}
                sx={{
                    '& .Mui-selected': {
                        color: '#000',
                        backgroundColor: 'blue',
                        '&:hover': {
                            backgroundColor: '',
                        },
                    },
                    '& .MuiPaginationItem-root': {
                        color: '#000',
                        backgroundColor: '#fff',
                        '&:hover': {
                            backgroundColor: '#FF5364',
                            color: '#fff'
                        },
                        width: '42px',
                        height: '42px',
                        borderRadius: '5px',
                        border: '1px solid #f7d2d5',
                        fontSize: '16px',
                    },
                }}
                renderItem={(item) => (
                    <PaginationItem {...item} sx={{ borderRadius: '0%' }} />
                )}
            />
        </Stack>
    );
}
