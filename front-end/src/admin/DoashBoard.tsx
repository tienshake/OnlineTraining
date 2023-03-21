import MasterLayoutAdmin from './MasterLayoutAdmin';
import './admin.css';
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';

export default function DoashBoard() {
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
              <p><b>Your avatar </b> <br /> PNG or JPG no bigger than 800px wide and tall. <br />
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

            <ul className='ifo_detail_profile'>
              <li>
                <p>Name</p>
                <input placeholder='Enter your firsr Name' />

                <p>age</p>
                <input placeholder='Enter your firsr Name' />

                <p>gender</p>
                <input placeholder='Enter your firsr Name' />

                <p>Phone</p>
                <input placeholder='Enter your firsr Name' />

                <p>Address</p>
                <input placeholder='Enter your firsr Name' />

                <p>Experience</p>
                <input placeholder='Enter your firsr Name' />
              </li>

              <li>
                <p>Avatar</p>
                <input placeholder='Enter your firsr Name' />

                <p>education</p>
                <input placeholder='Enter your firsr Name' />

                <p>About_Me</p>
                <textarea>
                  Write about me
                </textarea>
              </li>
            </ul>
          </div>
        </div>
      </MasterLayoutAdmin>
    </>
  )
}
