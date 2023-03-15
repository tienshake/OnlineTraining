import MasterLayoutAdmin from './MasterLayoutAdmin'
import CardUser from './componentsAdmin/CardUser';
import HeaderDashboard from './componentsAdmin/HeaderDashboard';
import ButtonGroupSelect from './componentsAdmin/ButtonGroupSelect';
import ShowModalForm from './componentsAdmin/ShowModalForm';
import type { RootState } from './store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getDataUser } from './store/features/userTeacher/userTeacherSlice';
import { useEffect } from 'react';
import AlertError from './componentsAdmin/AlertError';
import Loading from './componentsAdmin/Loading';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   boxShadow: 'none',
//   border: '1px solid #000'
// }));
export default function TeacherManager() {
  const dataUserStore = useSelector((state: RootState) => state.userTeachers.dataUserTeacher);
  const userStore = useSelector((state: RootState) => state.userTeachers);

  const dispatch = useDispatch();
  const { user } = dataUserStore;
  const { isLoading, error, messageError } = userStore;

  useEffect(() => {
    // const actionResult = dispatch(getDataUser());
    // const current = unwrapResult(actionResult);
    dispatch(getDataUser())
    // setAllUserTeacher(dataUserTeacher.user)

  }, [dispatch]);

  return (
    <div>
      <MasterLayoutAdmin>
        <HeaderDashboard />

        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <h1>Courses</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ShowModalForm />

            <ButtonGroupSelect />
            <ButtonGroupSelect />
          </div>
        </div>

        <p style={{ background: '#EEEEEE', width: '100%', height: '1px', marginTop: '15px  ' }}></p>

        <div className='wrap_bodyContent_admin'>
          {
            isLoading ? <Loading/> : error ? <AlertError messageError={messageError} /> : <>
              {
                user ? <>{user.map((data: any) => (
                  <div key={data.id}>
                    <CardUser name={data.name} decription="" />
                  </div>
                ))}</> : null
              }
            </>
          }
        </div>
      </MasterLayoutAdmin>
    </div>
  )
}
