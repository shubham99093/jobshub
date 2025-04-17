import { useState, useEffect } from "react";
import nodata from "../../../img/nodata.png";
import { IApplicationList } from "../../utils/types";
import { useRecruiter } from "../../contexts/RecruiterContext";
import { BACKEND_URL } from "../../config";
const RejectList = () => {
  useEffect(() => {
    getRejetList();
  }, []);

  const { accesstoken } = useRecruiter();
  const [userdata, setuserData] = useState<IApplicationList[] | []>([]);

  const requestoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`, //.replace(/"/g, '')}`,
    },
  };

  const getRejetList = async () => {
    const response = await fetch(`${BACKEND_URL}/rejectlist`, requestoption);
    const result = await response.json();
    setuserData(result);
  };
  return (
    <>
      <div>
        <>
          {/* ======================== Manage Job ========================= */}
          <section className="utf_manage_jobs_area padd-top-50 padd-bot-50 text-danger">
            <div className="container ">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  {userdata.length > 0 ? (
                    <tbody className="text-danger">
                      {userdata.map((item) => (
                        <tr key={item?._id}>
                          <td>
                            <a href="job-detail.html">
                              {" "}
                              <img
                                src={`${BACKEND_URL}/public/uploads1/seekerprofile/${item?.js_id?.js_profile}`}
                                className="avatar-lg"
                                alt="Avatar"
                              />
                              {item?.js_id?.js_name}
                            </a>
                          </td>
                          <td>{item?.js_id?.js_email}</td>

                          <td>{item?.js_id?.js_mno}</td>

                          <td>{item?.js_id?.js_gender}</td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      <img src={nodata} style={{ width: "400px" }} />
                    </td>
                  )}
                </table>
              </div>
            </div>
          </section>
          {/* ====================== End Manage Company ======  ========== */}
        </>
      </div>
    </>
  );
};

export default RejectList;
