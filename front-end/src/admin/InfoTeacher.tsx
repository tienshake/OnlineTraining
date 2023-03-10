import HeaderDashboard from './componentsAdmin/HeaderDashboard'
import MasterLayoutAdmin from './MasterLayoutAdmin';
import { GiTrophyCup } from 'react-icons/gi';
import CardUser from './componentsAdmin/CardUser';
import './admin.css';

export default function InfoTeacher() {
  return (
    <div>
      <MasterLayoutAdmin>
        <HeaderDashboard />
        <div className='wrapp_teacherInfo'>
          <div className='content-left'>
            <CardUser decription="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content." />

            {/* <h3 style={{ marginTop: '25px' }}>Robert Hammer Courses</h3> */}

            <h3 style={{ marginTop: '25px' }}>Robert Hammer Courses</h3>

            <ul className='achievement'>
              <li>
                <p className='icon'>
                  <GiTrophyCup />
                </p>
                <p className='content'>Successfully placed all students graduating between 2019 and 2020 into international organizations, through appropriate and well-placed career counseling</p>
              </li>

              <li>
                <p className='icon'>
                  <GiTrophyCup />
                </p>
                <p className='content'>Successfully implemented the International Baccalaureate program, resulting in an increased representation of the school on an international level.</p>
              </li>

              <li>
                <p className='icon'>
                  <GiTrophyCup />
                </p>
                <p className='content'>Smart Education in Best Teachers Award Certificatesg</p>
              </li>
            </ul>
          </div>

          <div className='content-right'>
            <div>
              <p>Robert Best Skill</p>

              <img src='D:\1.DATT\projetct\OnlineTraining\front-end\src\assets\images\so-do.png' alt='' />
            </div>
          </div>
        </div>

      </MasterLayoutAdmin>
    </div>
  )
}
