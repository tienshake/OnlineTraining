import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import userServices from '../../services/user';
import ModelAccess from './Modal/ModelAccess';
import { useState } from 'react';
import '../componentsAdmin/ComponentsAdmin.css';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface MyCardUserProps {
  decription: any;
  name: String,
  id: any,
  email: String,
  img: any
}


export default function CardUser(props: MyCardUserProps) {
  /* handle show alert access and delete user */
  const [openAccessDelete, setOpenAccessDelete] = useState(false);

  const handleOpenModalAccess = () => {
    setOpenAccessDelete(true);
  };

  const handleCloseModalAccess = () => {
    setOpenAccessDelete(false);
  };

  const handleDeleteAndClose = () => {
    userServices.deleteUserApi(props.id);
    setOpenAccessDelete(false);
    alert("Xoá thành công!")
  }

  return (
    <Link to={`/admin/teacher-info/${props.id}`}>
      <Paper
        sx={{
          pt: 2,
          pb: 2,
          pl: 2,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={4}>
          <Grid className='wrapp_main_imgUser' item>
            <ButtonBase sx={{ height: 120, border: '5px solid rgb(211, 207, 207)', borderRadius: '50%' }}>
              <Img style={{ borderRadius: '50%' }} alt="complex" src={`${props.img}`} />
            </ButtonBase>

            <ul className='group_btn_interact'>
              <li>
                <p style={{ color: '##CF9EAC' }}><FaUserFriends /></p>
                <p>55k</p>
              </li>
              <li>
                <p style={{ color: '#FFC107' }}><AiFillStar /></p>
                <p>55k</p>
              </li>
              <li>
                <p style={{ color: '#FFAA8A' }}><FaEdit /></p>
                <p>55k</p>
              </li>
            </ul>
          </Grid>

          <Grid item xs={11} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography className='class_compress_basic' gutterBottom variant="subtitle1" component="div">
                  <b>
                    {props.name}
                  </b>
                </Typography>

                <Typography style={{ fontSize: '13px', }} className='class_compress_basic' variant="body2" gutterBottom>
                  {/* {props.email} */}
                  email : {props.email.length > 18 ? props.email.slice(0, 18) + "..." :  props.email}
                </Typography>

                <p>
                  role: <b>{props.decription === 1 ? "admin" : props.decription === 2 ? "student" : props.decription === 3 ? "teacher" : ""}</b>
                </p>

                <p style={{ background: 'rgb(209, 207, 207)', height: '1px', width: '100%', marginTop: '20px' }}></p>

                <ul className="group_btn_contact">
                  {
                    openAccessDelete ? <>
                      <ModelAccess handleDeleteAndClose={handleDeleteAndClose} openModal={openAccessDelete} handleCloseModalAccess={handleCloseModalAccess} nameUser={props.name} />
                    </>
                      :
                      null
                  }
                  <li /* onClick={hande} */><FaEdit /></li>
                  <li onClick={handleOpenModalAccess} ><AiFillDelete /></li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>

  );
}
