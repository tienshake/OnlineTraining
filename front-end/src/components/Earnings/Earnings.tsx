// import CardMainProduct from "../Card/CardMainProduct";
import CardMyCourse from "../Card/CardMyCourse";
import { useEffect, useState } from "react";
import courseServices from "../../services/course";
import checkDataApi from "../../utils/checkDataApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import DefaultLayoutEdit from '../DefaultayoutEdit';
import './earnings.css'
import BarChart from '../BarChart/BarChart';
import { Stack } from "@mui/material";

export default function Earnings() {
    const [dataMyCourse, setDataMyCourse] = useState([]);
    const user = useSelector((state: RootState) => state.auth.user);

    const getCourseMyData = async () => {
        const data = await courseServices.getMyCourseApi(user.id);
        const result = checkDataApi(data);
        if (result) {
            setDataMyCourse(result.data);
        }
    };

    useEffect(() => {
        if (user.id) {
            getCourseMyData();
        }
    }, []);
    return (
        <DefaultLayoutEdit>
            <ul className='header_earning'>
                <li>
                    <p>REVENUE</p>
                    <p className='content' style={{ color: '#159F46' }}>$467.34</p>
                    <p>Earning this month</p>
                </li>
                <li>
                    <p>REVENUE</p>
                    <p className='content' style={{ color: '#1D9CFD' }}>$467.34</p>
                    <p>Earning this month</p>
                </li>
                <li>
                    <p>REVENUE</p>
                    <p className='content' style={{ color: '#FFB58A' }}>$467.34</p>
                    <p>Earning this month</p>
                </li>
            </ul>


            <div className='bodyContent_earning'>
                <BarChart />
            </div>


           
            <div className="best_Selling_Courses">
                <div className="header_best_Selling_Courses">
                <h2 style={{ color: "#392C7D", padding: '5px', fontSize: '25px', marginBottom:'10px' }}>Best Selling Courses</h2>
                    <Stack
                        className="title_header-myCourse"
                        direction="row"
                        justifyContent={"space-between"}
                        spacing={1}
                        bgcolor={"#F0F0F0"}
                    >
                        <Stack>
                            <p><h4>COURSES</h4></p>
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            spacing={4}
                            bgcolor={"#F0F0F0"}
                        >
                            <p><h4>SALES</h4></p>
                            <p><h4>AMOUNT</h4></p>
                        </Stack>

                    </Stack>
                </div>

                <div className="body-best_Selling_Courses">
                    {dataMyCourse &&
                        dataMyCourse.length > 0 &&
                        dataMyCourse.map((course, index) => (
                            <CardMyCourse
                                course={course}
                                key={index}
                                getCourseMyData={getCourseMyData}
                            />
                        ))}
                </div>
            </div>
        </DefaultLayoutEdit>
    )
}
