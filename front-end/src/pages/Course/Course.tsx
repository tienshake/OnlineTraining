import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CiFilter } from "react-icons/ci";
import React from 'react';
import "./Course.css";
import CardMainProduct from '../../components/Card/CardMainProduct';

export default function Course() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div className='wrapp_course'>
            <div className="content">
                {/* <li> <CiFilter /> Showin</li>
                    <li>Showin</li> */}
                <div className='body_content_left'>
                    <ul className="header_screening">
                        <li>Showing 1-9 of 50 results</li>

                        <li>
                            <FormControl sx={{ m: 0, width: '100%', height: '20px' }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: '15px' }}
                                    size="small"
                                    id="outlined-adornment-weight"
                                    startAdornment={<InputAdornment position="start">kg</InputAdornment>}
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
                        <div>
                            <CardMainProduct borderStyle={true} widthCard="100%" />
                        </div>

                        <div>
                            <CardMainProduct borderStyle={true} widthCard="100%" />
                        </div>

                        <div>
                            <CardMainProduct borderStyle={true} widthCard="100%" />
                        </div>

                        <div>
                            <CardMainProduct borderStyle={true} widthCard="100%" />
                        </div>
                    </div>
                </div>

                <div className='body_content_right'>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    )
}
