import MasterLayoutAdmin from "./MasterLayoutAdmin";
import "./admin.css";
import { useState } from "react";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editUserById,
  getDataDetailUser,
} from "../redux/features/userTeacher/userTeacherSlice";
import userServices from "../services/user";
import AlertError from "./componentsAdmin/AlertError";
import AlertSuccess from "./componentsAdmin/AlertSuccess";

export interface TypeObjectInputDetailUser {
  name?: String;
  age?: String;
  gender?: String;
  phone?: String;
  address?: String;
  education?: String;
  experience?: String;
  aboutMe?: String;
}
export interface ErrorSubmitDetailUser {
  name?: String;
  age?: String;
  gender?: String;
  phone?: String;
  address?: String;
  education?: String;
  experience?: String;
  aboutMe?: String;
}

export default function Profile() {
  /* get store redux */
  const dispatch = useDispatch();
  const dataUserStore = useSelector(
    (state: RootState) => state.userTeachers.dataUserTeacher
  );
  const userStore = useSelector((state: RootState) => state.userTeachers);
  const { isLoading, messageSuccessEditTeacher, errorEditUserTeacher } =
    userStore;
  const { data } = dataUserStore;
  const [inputs, setInputs] = useState<TypeObjectInputDetailUser>({});

  useEffect(() => {
    dispatch(getDataDetailUser(1)); // truyền id vào đây
  }, [dispatch]);

  /* handle get value onchange */
  const handleInputChange = (e: any) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({
      ...state,
      [nameInput]: valueInput === "" ? undefined : valueInput,
    }));
  };

  /* Submit */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(getDataDetailUser(1)); // truyền id vào đây

    try {
      const { data } = await userServices.editUserApi(
        {
          name: inputs.name,
          age: inputs.age,
          gender: inputs.gender,
          Phone: inputs.phone,
          Address: inputs.address,
          Education: inputs.education,
          Experience: inputs.experience,
          About_Me: inputs.aboutMe,
        },
        1
      ); // truyền id vào đây

      dispatch(editUserById(data));
    } catch (error: any) {
      dispatch(editUserById(error));
    }

    alert("Cập Nhật thông tin thành công!");
  };

  return (
    <>
      <MasterLayoutAdmin>
        {/* message error */}
        {errorEditUserTeacher ? (
          <AlertError messageError={"Lỗi edit "} />
        ) : null}

        {/* message success */}
        {!errorEditUserTeacher && messageSuccessEditTeacher ? (
          <AlertSuccess messageSuccess={messageSuccessEditTeacher.message} />
        ) : null}

        {isLoading ? (
          <>Loadunbg,,</>
        ) : (
          <>
            {data && data.user_details ? (
              <>
                <div className="wrapp_profile_admin">
                  <div className="title_profile">
                    <h2>Profile Details</h2>
                    <p>
                      You have full control to manage your own account setting.
                    </p>
                  </div>

                  <ul className="box_header_profile">
                    <li className="group_avatar">
                      <img
                        src="https://dreamslms.dreamguystech.com/html/assets/img/user/user11.jpg"
                        alt="avatar"
                      />
                      <p>
                        <b style={{ color: "#392C7D" }}>Your avatar </b> <br />{" "}
                        PNG or JPG no bigger than 800px wide and tall. <br />
                        <Button
                          style={{ background: "#159F46", marginTop: "8px" }}
                          variant="contained"
                          component="label"
                        >
                          Upload File
                          <input type="file" hidden />
                        </Button>
                      </p>
                    </li>

                    <li className="btn_update">
                      <Stack spacing={1} direction="row">
                        <button>Update</button>
                        <button>Update</button>
                      </Stack>
                    </li>
                  </ul>

                  <div className="body_profile">
                    <h2>Personal Details</h2>
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Edit your personal information and address.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <ul className="ifo_detail_profile">
                        <li>
                          <p className="title_input">Name</p>
                          <input
                            placeholder={`${
                              data.name ? data.name : "Enter your name here!"
                            }`}
                            name="name"
                            onChange={handleInputChange}
                          />

                          <p className="title_input">Age</p>
                          <input
                            type="number"
                            min="0"
                            placeholder={`${
                              data.user_details.age
                                ? data.user_details.age
                                : "Enter your age here!"
                            }`}
                            name="age"
                            onChange={handleInputChange}
                          />

                          <p className="title_input">gender</p>
                          <input
                            placeholder={`${
                              data.user_details.gender
                                ? data.user_details.gender
                                : "Enter your gender here!"
                            }`}
                            name="gender"
                            onChange={handleInputChange}
                          />

                          <p className="title_input">Phone</p>
                          <input
                            type="number"
                            min="0"
                            placeholder={`${
                              data.user_details.phone_number
                                ? data.user_details.phone_number
                                : "Enter your phone number here!"
                            }`}
                            name="phone"
                            onChange={handleInputChange}
                          />

                          <p className="title_input">Address</p>
                          <input
                            name="address"
                            placeholder={`${
                              data.user_details.address
                                ? data.user_details.address
                                : "Enter your address here!"
                            }`}
                            onChange={handleInputChange}
                          />
                        </li>

                        <li>
                          <p className="title_input">education</p>
                          <input
                            name="education"
                            placeholder={`${
                              data.user_details.education
                                ? data.user_details.education
                                : "Enter your education here!"
                            }`}
                            onChange={handleInputChange}
                          />

                          <p className="title_input">Experience</p>
                          <input
                            placeholder={`${
                              data.user_details.experience
                                ? data.user_details.experience
                                : "Enter your Experience here!"
                            }`}
                            name="experience"
                            onChange={handleInputChange}
                          />

                          <p className="title_input">About Me</p>
                          <textarea
                            name="aboutMe"
                            placeholder={`${
                              data.user_details.about_me
                                ? data.user_details.about_me
                                : "Write about you here!"
                            }`}
                            onChange={handleInputChange}
                          ></textarea>
                        </li>
                      </ul>
                      <button type="submit" className="btn_submit_profile">
                        Update Profile
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>Loading</>
            )}

            {/* {
              data && data.user_details ? <>
                <div className='wrapp_profile_admin'>
                  <div className='title_profile'>
                    <h2>Profile Details</h2>
                    <p>You have full control to manage your own account setting.</p>
                  </div>

                  <ul className='box_header_profile'>
                    <li className='group_avatar'>
                      <img src='https://dreamslms.dreamguystech.com/html/assets/img/user/user11.jpg' alt='avatar' />
                      <p><b style={{ color: "#392C7D" }}>Your avatar </b> <br /> PNG or JPG no bigger than 800px wide and tall. <br />
                        <Button
                          style={{ background: '#159F46', marginTop: '8px' }}
                          variant="contained"
                          component="label"
                        >
                          Upload File
                          <input
                            type="file"
                            hidden
                          />
                        </Button>
                      </p>
                    </li>

                    <li className='btn_update'>
                      <Stack spacing={1} direction="row">
                        <button>Update</button>
                        <button>Update</button>
                      </Stack>
                    </li>
                  </ul>

                  <div className='body_profile'>
                    <h2>Personal Details</h2>
                    <p style={{ marginTop: '10px', marginBottom: '10px' }}>Edit your personal information and address.</p>
                    <form onSubmit={handleSubmit} >
                      <ul className='ifo_detail_profile'>
                        <li>
                          <p className='title_input'>Name</p>
                          <input
                            placeholder={`${data.name ? data.name : "Enter your name here!"}`}
                            name="name"
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>Age</p>
                          <input
                            type="number"
                            min="0"
                            placeholder={`${data.user_details.age ? data.user_details.age : "Enter your age here!"}`}
                            name="age"
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>gender</p>
                          <input
                            placeholder={`${data.user_details.gender ? data.user_details.gender : "Enter your gender here!"}`}
                            name="gender"
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>Phone</p>
                          <input
                            type="number"
                            min="0"
                            placeholder={`${data.user_details.phone_number ? data.user_details.phone_number : "Enter your phone number here!"}`}
                            name="phone"
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>Address</p>
                          <input
                            name="address"
                            placeholder={`${data.user_details.address ? data.user_details.address : "Enter your address here!"}`}
                            onChange={handleInputChange}
                          />
                        </li>

                        <li>
                          <p className='title_input'>education</p>
                          <input
                            name="education"
                            placeholder={`${data.user_details.education ? data.user_details.education : "Enter your education here!"}`}
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>Experience</p>
                          <input
                            placeholder={`${data.user_details.experience ? data.user_details.experience : "Enter your Experience here!"}`}
                            name="experience"
                            onChange={handleInputChange}
                          />

                          <p className='title_input'>About Me</p>
                          <textarea
                            name="aboutMe"
                            placeholder={`${data.user_details.about_me ? data.user_details.about_me : "Write about you here!"}`}
                            onChange={handleInputChange}
                          >

                          </textarea>
                        </li>
                      </ul>
                      <button type="submit" className='btn_submit_profile'>Update Profile</button>
                    </form>
                  </div>
                </div>
              </> : <>cc</>
            } */}
          </>
        )}
      </MasterLayoutAdmin>
    </>
  );
}
