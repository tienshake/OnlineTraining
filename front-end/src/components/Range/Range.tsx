import * as React from 'react';
// import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';



export default function Range() {
    return (
        <Slider
            value={10}
            aria-label="Course progress"
            valueLabelDisplay="auto"
            marks={[{ value: 10, label: `${10}%` }]}
            disabled
        />
    );
}