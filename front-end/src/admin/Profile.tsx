import MasterLayoutAdmin from './MasterLayoutAdmin';
import './admin.css';
import { useState } from "react";
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getDataDetailUser } from "../redux/features/userTeacher/userTeacherSlice";


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

export interface TypeErrorDetailUser {
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
  const [inputs, setInputs] = useState<TypeObjectInputDetailUser>({});
  const [errors, setErrors] = useState<TypeErrorDetailUser>({});

  /* store */
  const dataUserStore = useSelector(
    (state: RootState) => state.userTeachers.dataUserTeacher
  );
  const userStore = useSelector((state: RootState) => state.userTeachers);
  const { isLoading, error, messageError } = userStore;
  const { data } = dataUserStore;

  // console.log(data.user_details)
  // console.log(dataUserStore)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataDetailUser("1"));
  }, [dispatch]);


  const handleInputChange = (e: any) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    console.log(inputs)

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let errorSubmit: ErrorSubmitDetailUser = {};
    let checkName = false;
    let checkAge = false;
    let checkGender = false;
    let checkPhone = false;
    let checkAddress = false;
    let checkEducation = false;
    let checkExperience = false;
    let checkAboutMe = false;

    /* validate name */
    if (inputs.name === undefined || inputs.name === "") {
      errorSubmit.name = "Please enter your name!";
      setErrors(errorSubmit);
      checkName = false;
    } else {
      setErrors(errorSubmit);
      checkName = true;
    }

    /* validate age */
    if (inputs.age === undefined || inputs.age === '') {
      errorSubmit.age = "Please enter your age!";
      setErrors(errorSubmit);
      checkAge = false;
    } else {
      setErrors(errorSubmit);
      checkAge = true;
    };

    /* validate gender */
    if (inputs.gender === undefined || inputs.gender === '') {
      errorSubmit.gender = "Please enter your gender!";
      setErrors(errorSubmit);
      checkGender = false;
    } else {
      setErrors(errorSubmit);
      checkGender = true;
    };

    /* validate Phone */
    if (inputs.phone === undefined || inputs.phone === '') {
      errorSubmit.phone = "Please enter your Phone!";
      setErrors(errorSubmit);
      checkPhone = false;
    } else {
      setErrors(errorSubmit);
      checkPhone = true;
    };

    /* validate Phone */
    if (inputs.phone === undefined || inputs.phone === '') {
      errorSubmit.phone = "Please enter your Phone!";
      setErrors(errorSubmit);
      checkPhone = false;
    } else {
      setErrors(errorSubmit);
      checkPhone = true;
    };

    /* validate Address */
    if (inputs.address === undefined || inputs.address === '') {
      errorSubmit.address = "Please enter your Address!";
      setErrors(errorSubmit);
      checkAddress = false;
    } else {
      setErrors(errorSubmit);
      checkAddress = true;
    };

    /* validate Education */
    if (inputs.education === undefined || inputs.education === '') {
      errorSubmit.education = "Please enter your Education!";
      setErrors(errorSubmit);
      checkEducation = false;
    } else {
      setErrors(errorSubmit);
      checkEducation = true;
    };

    /* validate Experience */
    if (inputs.experience === undefined || inputs.experience === '') {
      errorSubmit.experience = "Please enter your Experience!";
      setErrors(errorSubmit);
      checkExperience = false;
    } else {
      setErrors(errorSubmit);
      checkExperience = true;
    };

    /* validate AboutMe */
    if (inputs.aboutMe === undefined || inputs.aboutMe === '') {
      errorSubmit.aboutMe = "Please enter your AboutMe!";
      setErrors(errorSubmit);
      checkAboutMe = false;
    } else {
      setErrors(errorSubmit);
      checkAboutMe = true;
    };

    // if (checkName && checkAge && checkGender && checkPhone && checkAddress && checkEducation && checkExperience && checkAboutMe) {
    //   alert("ok")
    // } else {
    //   alert("Login failed !");
    //   console.log(inputs)
    // }
  }



  return (
    <>
      <MasterLayoutAdmin>
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
                    placeholder='Enter your name'
                    name="name"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>age</p>
                  <input
                    placeholder='Enter your age'
                    name="age"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>gender</p>
                  <input
                    placeholder='Enter your gender'
                    name="gender"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>Phone</p>
                  <input
                    placeholder='Enter your phone'
                    name="phone"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>Address</p>
                  <input
                    placeholder='Enter your address'
                    name="address"
                    onChange={handleInputChange}
                  />
                </li>

                <li>
                  <p className='title_input'>education</p>
                  <input
                    placeholder='Enter your education'
                    name="education"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>Experience</p>
                  <input
                    placeholder='Enter your Experience'
                    name="experience"
                    onChange={handleInputChange}
                  />

                  <p className='title_input'>About Me</p>
                  <textarea
                    name="aboutMe"
                    onChange={handleInputChange}
                  >
                    Write about me
                  </textarea>
                </li>
              </ul>
              <button type="submit" className='btn_submit_profile'>Update Profile</button>
            </form>
          </div>
        </div>
      </MasterLayoutAdmin>
    </>
  )
}
