import HeaderDashboard from './componentsAdmin/HeaderDashboard'
import MasterLayoutAdmin from './MasterLayoutAdmin';
// import { useTheme } from '@mui/material/styles';
import { GiTrophyCup } from 'react-icons/gi';
import CardUser from './componentsAdmin/CardUser';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './admin.css';
import EvaluateStar from './componentsAdmin/EvaluateStar';
import QuantityLessons from './componentsAdmin/QuantityLessons';
import NumberTime from './componentsAdmin/NumberTime';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function InfoTeacher() {
  // const theme = useTheme();

  const data = [
    '1', '2', '3', '4'
  ];

  return (
    <div>
      <MasterLayoutAdmin>
        <HeaderDashboard />
        <div className='wrapp_teacherInfo'>
          <div className='content-left'>
            <CardUser decription="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content." />

            <h3 style={{ marginTop: '50px' }}>Robert Hammer Courses</h3>

            <div className='wrapp_allCoursesOf_teacher'>
              {
                data.map((index) => (
                  <div key={index}>
                    <Card className='card_coursesOf_teacher' sx={{ display: 'flex', gap: '10px' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: '80px', borderRadius: '7px' }}
                        image="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                        alt="Live from space album cover"
                      />
                      <div className='left_content'>
                        <p>
                          Marketing
                        </p>

                        <EvaluateStar />

                        {/* Quantity Lessons */}
                        <QuantityLessons/>
                        
                        {/* Time Number */}
                        <NumberTime />
                      </div>

                      <div className='right_content'>
                        <p>$80</p>

                        <button>
                          <AiOutlineShoppingCart />
                          <p>Buy</p>
                        </button>
                      </div>
                    </Card>
                  </div>
                ))
              }
            </div>



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
            <p>Robert Best Skill</p>
            <img style={{ width: '100%' }} src='https://lh3.googleusercontent.com/ygi-leOc-e1VJwRHrOePjSeg7hIAdzbiuSSvPvQ94GRSsrJZaXt4lqgWQtVyF1ozXNwstjp_mW9-m0F_L3oXvoMcxH7RKbS5DGqFZevP' alt='' />
            <p>Reviews</p>
            {
              data.map((index) => (
                <>
                  <div key={index}>
                    <div className='box_reviews_user'>
                      <img src='https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar3.jpg' alt='' />
                      <p><b>Diane Fishe</b>r 450 Followers  <br />
                        3 hours ago @RobertHammer</p>

                      <EvaluateStar />

                      <p>Robert Hammer is Best Lectures</p>

                      <p className='decritions'>
                        "Excellent balance of lecture, live playing and recordings. Cecilia possesses a great sense of humor. So well researched, so engaging both as a lecturer and a pianist."
                      </p>
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        </div>

      </MasterLayoutAdmin>
    </div>
  )
}
