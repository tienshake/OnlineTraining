import DefaultLayoutEdit from '../DefaultayoutEdit';
import { Stack } from '@mui/material';
import "./myCourse.css"
import CardMainProduct from '../Card/CardMainProduct';
import CardMyCourse from '../Card/CardMyCourse';

export default function MyCourse() {
    return (
        <DefaultLayoutEdit>
            <div className='wrapper_mycourse'>
                <div className='header_myCourse'>
                    <ul>

                    </ul>

                    <Stack className='title_header-myCourse' direction="row" justifyContent={'space-between'} spacing={1} bgcolor={"#F0F0F0"}>
                        <p>COURSES</p>
                        <Stack direction="row" spacing={4} justifyContent={'space-between'}>
                            <p>STUDENT</p>
                            <p style={{marginRight: '25px'}}>STATUS</p>
                        </Stack>
                    </Stack>
                </div>

                <div className='body-myCourse'>
                    <CardMyCourse />
                    <CardMyCourse />
                    <CardMyCourse />
                    <CardMyCourse />
                </div>
            </div>
        </DefaultLayoutEdit>
    )
}
