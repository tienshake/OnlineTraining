import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CiFilter } from "react-icons/ci";
import "./Course.css";
import CardMainProduct from '../../components/Card/CardMainProduct';
import CheckboxListCate from '../../components/ListFilters/CheckboxListCate';
import covertB64 from '../../utils/covertB64';
import PaginationRounded from '../../components/Pagination/Pagination';
import React, { useEffect, useState } from 'react';
import courseServices from '../../services/course';



export default function Course() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };


    /*  */
    const [dataCourses, setDataCourses] = useState<any>();
    console.log(dataCourses, "dataCourses")


    /* Paginate */
    const [limit, /* setLimit */] = useState(6);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        courseServices.getCourseApi({
            id: 'ALL',
            limit: limit,
            page: 1,
        }).then((data:any) => {
            setDataCourses(data.data.data.rows);

            const total = data.data.data.count;
            console.log(total, "total")
            setPageCount(Math.ceil(total / limit));
        })
    }, [limit]);

    console.log(dataCourses)


    return (
        <div className='wrapp_course'>
            <div className="content">
                <div className='body_content_left'>
                    <ul className="header_screening">
                        <li>Showing 1-9 of 50 results</li>

                        <li>
                            <FormControl sx={{ m: 0, width: '100%', height: '20px' }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: '15px' }}
                                    size="small"
                                    id="outlined-adornment-weight"
                                    startAdornment={<InputAdornment position="start">icons</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
                            </FormControl>
                        </li>

                        <li>
                            <FormControl sx={{ width: '100%' }}>
                                <Select
                                    sx={{ fontSize: '15px' }}
                                    size="small"
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <p style={{ fontSize: '14px' }}>Newly published</p>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                            </FormControl>
                        </li>
                    </ul>


                    {/*  */}
                    <div className='box_content-course'>
                        {
                            dataCourses ? <>
                                {
                                    dataCourses.map((data: {
                                        id: number,
                                        thumbnail: string,
                                        promotion_price: string,
                                        price: string,
                                        title: string,
                                    }) => (
                                        <div key={data.id}>
                                            <CardMainProduct
                                                preventPath="/course" idCourse={data.id}
                                                imageItem={covertB64(data.thumbnail)}
                                                borderStyle={true}
                                                promotion_price={data.promotion_price}
                                                priceItem={data.price}
                                                titleItem={data.title}
                                                widthCard="100%" />
                                        </div>
                                    ))
                                }
                            </> : <>Loading...</>
                        }
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <PaginationRounded limit={limit} pageCount={pageCount} setDataCourses={setDataCourses} />
                    </div>
                </div>

                <div className='body_content_right'>
                    <ul className='header-filterList'>
                        <li> <CiFilter /> Showin</li>
                        <li>Showin</li>
                    </ul>

                    <div className='content_listFilters_course'>
                        <CheckboxListCate />
                    </div>
                </div>
            </div>
        </div>
    )
}