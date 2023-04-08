import * as React from 'react';
import Stack from '@mui/material/Stack';
import "./pagination.css"
import { Pagination, PaginationItem } from "@mui/material";
import { useEffect, useState } from 'react';
import courseServices from '../../services/course';

export default function PaginationRounded() {
    const [limit, setLimit] = useState(3);
    const [currentPage, setCurrentPage] = useState(3);

    const [pageCount, setPageCount] = useState(1);

    const [dataCourses, setDataCourses] = useState<any>();


    const handleChangePage = (e: any, p:any) => {
        const selectedIndex = p
        console.log(selectedIndex)
        getPanigateData();

    }

    const getPanigateData = () => {

        courseServices.getCourseApi({
            id: 'ALL',
            limit: limit,
            page: currentPage,
        }).then((data) => /* setDataCourses(data.data.data.rows) */ {
            // console.log(data.data.data.count, "count")
            setPageCount(data.data.data.count)
        })

        // console.log(pageCount, 'pageCount')
    }



    return (
        <Stack spacing={2}>
            <Pagination
                onChange={handleChangePage}
                count={20}
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
                    // <>
                    //     {console.log(item.page)}
                    // </>
                    <PaginationItem {...item} sx={{ borderRadius: '0%' }} />
                )}
            />
        </Stack>
    );
}
