import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { BsFillMicFill } from 'react-icons/bs';
import { ImVideoCamera } from 'react-icons/im';
import { RiUser3Fill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import './ComponentsAdmin.css';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface MyCardUserProps {
  decription: String;
  name: String
}

export default function CardUser(props: MyCardUserProps) {
  return (
    <Link to="/admin/teacher-info">
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
              <Img style={{ borderRadius: '50%' }} alt="complex" src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg" />
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
                <p style={{ color: '#FFAA8A' }}><ImVideoCamera /></p>
                <p>55k</p>
              </li>
            </ul>
          </Grid>

          <Grid item xs={11} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {props.name}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  ENVIRONMENTAL ENGINEERING
                </Typography>

                <p>
                  {props.decription}
                </p>

                <p style={{ background: 'rgb(209, 207, 207)', height: '1px', width: '100%', marginTop: '20px' }}></p>

                <ul className="group_btn_contact">
                  <li><BsFillMicFill /></li>
                  <li><ImVideoCamera /></li>
                  <li><RiUser3Fill /></li>
                </ul>
              </Grid>

              {/* <ul className="group_btn_contact" style={{ display: 'flex' }}>
              <li><BsFillMicFill /></li>
              <li><ImVideoCamera /></li>
              <li><RiUser3Fill /></li>
            </ul> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>

  );
}
