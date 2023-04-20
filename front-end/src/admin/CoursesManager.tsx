import React, { useEffect, useState } from "react";
import MasterLayoutAdmin from "./MasterLayoutAdmin";
import "./admin.css";
import courseServices from "../services/course";
import cache from "memory-cache";
import Loading from "./componentsAdmin/Loading";
import CardMainProduct from "../components/Card/CardMainProduct";
import covertB64 from "../utils/covertB64";
import PaginationRounded from "../components/Pagination/Pagination";

export default function CoursesManager() {

  /*  */
  const [dataCourses, setDataCourses] = useState<any>();

  /* Paginate */
  const [limit /* setLimit */] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    courseServices
      .getCourseApi({
        id: "ALL",
        limit: limit,
        page: 1,
      })
      .then((data: any) => {
        cache.put("courseListCache", data.data.data.rows);

        setDataCourses(data.data.data.rows);
        const total = data.data.data.count;
        setPageCount(Math.ceil(total / limit));
      });
  }, [limit]);

  return (
    <>
      <MasterLayoutAdmin>
        {/* <HeaderDashboard /> */}
        <div className="wrap_courses_dashboard">
          {dataCourses ? (
            <>
              {dataCourses.map(
                (data: any) => (
                  <div key={data.id}>
                    <CardMainProduct
                      preventPath="/course"
                      idCourse={data.id}
                      imageItem={covertB64(data.thumbnail)}
                      borderStyle={true}
                      promotion_price={data.promotion_price}
                      priceItem={data.price}
                      titleItem={data.title}
                      widthCard="100%"
                      rating={
                        data.Ratings &&
                        data.Ratings.length > 0 &&
                        +data?.Ratings[0].avg_rating_value
                      }
                    />
                  </div>
                )
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
        <div style={{ marginTop: "40px", marginBottom: '40px' }}>
          <PaginationRounded
            limit={limit}
            pageCount={pageCount}
            setDataCourses={setDataCourses}
          />
        </div>
      </MasterLayoutAdmin>
    </>
  );
}
