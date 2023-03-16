import { Link } from 'react-router-dom';
import NumberTime from './NumberTime';
import QuantityLessons from './QuantityLessons';
import QuantityPrice from './QuantityPrice';
import QuantityStar from './QuantityStar';


export default function CardCourses() {
  return (
    <div style={{ width: "100%" }}>
      <Link to='/admin/courses-info'>
        <img style={{ width: '100%' }} src='https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/video-img/video1.jpg' alt='' />

        <h4>Đây là bài 1</h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '8px'}}>
          <div>
            <QuantityLessons/>
            <QuantityPrice/>
          </div>

          <div>
            <NumberTime  />
            <QuantityStar/>
          </div>
        </div>
      </Link>
    </div>
  );
}
