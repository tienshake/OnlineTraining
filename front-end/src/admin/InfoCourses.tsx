import MasterLayoutAdmin from "./MasterLayoutAdmin";
import "./admin.css";

export default function InfoCourses() {
  return (
    <div>
      <MasterLayoutAdmin>
        {/* <HeaderDashboard /> */}
        <div className="wrapp_coursesInfo">
          <div className="content-left">
            <img
              src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/video-img/video1.jpg"
              alt=""
            />

            <h4>Description of Environmental Engineering</h4>
            <p>
              The Civil engineer must be aware of the environmental effects of
              pollutants and should be able to understand the pollutants, their
              characteristics and manage systems to mitigate them.
            </p>
          </div>

          <div className="content-right">
            <p>Robert Best Skill</p>
          </div>
        </div>
      </MasterLayoutAdmin>
    </div>
  );
}
