import MasterLayoutAdmin from "./MasterLayoutAdmin";
import CardUser from "./componentsAdmin/CardUser";
// import HeaderDashboard from './componentsAdmin/HeaderDashboard';
import ButtonGroupSelect from "./componentsAdmin/ButtonGroupSelect";
import ShowModalForm from "./componentsAdmin/Modal/ShowModalForm";
import type { RootState } from "../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { getDataUser } from "../redux/features/userTeacher/userTeacherSlice";
import { useEffect, useState } from "react";
import AlertError from "./componentsAdmin/AlertError";
import Loading from "./componentsAdmin/Loading";
import covertB64 from "../utils/covertB64";

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
  const dataUserStore = useSelector(
    (state: RootState) => state.userTeachers.dataUserTeacher
  );
  const userStore = useSelector((state: RootState) => state.userTeachers);

  const dispatch = useDispatch();
  const { data } = dataUserStore;
  const { isLoading, error, messageError } = userStore;
  const [indexRole, setIndexRole] = useState(0);

  useEffect(() => {
    // const actionResult = dispatch(getDataUser());
    // const current = unwrapResult(actionResult);
    dispatch(getDataUser({
      role: indexRole,
    }));
    // setAllUserTeacher(dataUserTeacher.user)
  }, [dispatch, indexRole]);

  return (
    <div>
      <MasterLayoutAdmin>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Courses</h1>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <ShowModalForm />

            <ButtonGroupSelect indexRole={indexRole} setIndexRole={setIndexRole} />
          </div>
        </div>

        <p
          style={{
            background: "#EEEEEE",
            width: "100%",
            height: "1px",
            marginTop: "15px  ",
          }}
        ></p>

        <div className="wrap_bodyContent_admin">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {error ? (
                <AlertError messageError={messageError} />
              ) : (
                <>
                  {dataUserStore && data?.rows ? (
                    <>
                      {data?.rows.map((data: any) => (
                        <div key={data.id}>
                          <CardUser
                            img={data.user_details.avatar ? covertB64(data.user_details.avatar.data) : "https://png.pngtree.com/png-vector/20190728/ourlarge/pngtree-avatar-user-profile-flat-color-icon-vector-icon-banner-png-image_1619399.jpg"}
                            id={data.id}
                            name={data.name}
                            decription={data.role_id}
                            email={data.email}
                          />
                        </div>
                      ))}
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </MasterLayoutAdmin>
    </div>
  );
}
