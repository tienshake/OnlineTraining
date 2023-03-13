import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './ComponentsAdmin.css'

const style = {
  position: 'absolute' as 'absolute',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};

export default function ShowModalForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <div>
      <Button onClick={handleOpen}>Add User</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal_show" sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Nhập Thông tin User
          </Typography>

          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="">Name</InputLabel>
              <Input
              // id=""
              // startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="">Email</InputLabel>
              <Input
              // id=""
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
              <InputLabel htmlFor="">Password</InputLabel>
              <Input
                // id=""
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: '100%', mb: 5 }} variant="standard">
              <InputLabel htmlFor="">Confirm Password</InputLabel>
              <Input
                // id=""
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: '100%', mt: 0 }} size="small">
              <InputLabel id="demo-select-small">Age</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Role</em>
                </MenuItem>
                <MenuItem value={10}>teacher</MenuItem>
                <MenuItem value={20}>student</MenuItem>
              </Select>
            </FormControl>

            <div className='GroupBtn_Save-Cancel' style={{ width: '100%', display: 'flex', gap: '5px', marginTop: '20px' }}>
              <Button variant="contained">Submit</Button>
              <Button onClick={handleClose} variant="contained">Cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}