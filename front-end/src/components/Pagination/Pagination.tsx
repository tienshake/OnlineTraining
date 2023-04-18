import Stack from '@mui/material/Stack';
import "./pagination.css"
import { Pagination, PaginationItem } from "@mui/material";
import courseServices from '../../services/course';

interface MyPaginationRoundedProps {
    limit: number,
    pageCount: number,
    setDataCourses: any
}

export default function PaginationRounded(props: MyPaginationRoundedProps) {
    const fetchDataCourses = async (currentPage: Number) => {
        const res = await courseServices.getCourseApi(
            {
                id: 'ALL',
                limit: props.limit,
                page: currentPage,
            }
        );

        const data = await res.data.data.rows;
        return data;
    }

    const handleChangePage = async (e: any, p: any) => {
        const currentPage = p
        const commentsFormServer = await fetchDataCourses(currentPage);
        props.setDataCourses(commentsFormServer)
    }

    return (
        <>
            <Stack spacing={2}>
                <Pagination
                    onChange={handleChangePage}
                    count={props.pageCount}
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
        </>
    );
}
