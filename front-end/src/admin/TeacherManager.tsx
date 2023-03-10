import MasterLayoutAdmin from './MasterLayoutAdmin'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardUser from './componentsAdmin/CardUser';
import HeaderDashboard from './componentsAdmin/HeaderDashboard';
import ButtonGroupSelect from './componentsAdmin/ButtonGroupSelect';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: '1px solid #000'
}));

export default function TeacherManager() {
  return (
    <div>
      <MasterLayoutAdmin>
        <HeaderDashboard />

        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <h1>Courses</h1>

          <div style={{ display: 'flex' }}>
            <ButtonGroupSelect />
            <ButtonGroupSelect />
          </div>
        </div>

        <p style={{ background: '#EEEEEE', width: '100%', height: '1px', marginTop: '15px  ' }}></p>
        
        <div className='wrap_bodyContent_admin'>
          <CardUser decription="" />
          <CardUser decription="" />
          <CardUser decription="" />
          <CardUser decription="" />
          <CardUser decription="" />
          <CardUser decription="" />
        </div>
      </MasterLayoutAdmin>
    </div>
  )
}
