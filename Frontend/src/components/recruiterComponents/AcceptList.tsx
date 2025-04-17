import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import nodata from "../../../img/nodata.png";
import { IApplicationList } from "../../utils/types";
import { useRecruiter } from "../../contexts/RecruiterContext";
const AcceptList = () => {
  useEffect(() => {
    getAcceptList();
  }, []);

  const { accesstoken } = useRecruiter();
  const [userdata, setuserData] = useState<IApplicationList[] | []>([]);
  const requestoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  const getAcceptList = async () => {
    const response = await fetch(
      "http://localhost:5000/acceptlist",
      requestoption
    );
    const result = await response.json();
    setuserData(result);
  };
  const exportcsv = async () => {
    const d1 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:5000/exportcsv/${accesstoken}`,
      d1
    );
    if (response.status === 200) {
      window.open(response.url, "self");
    } else {
      toast.error("Please Try After Some Time");
    }
  };

  return (
    <>
      <>
        {/* ======================== Manage Job ========================= */}
        <section className="utf_manage_jobs_area padd-top-50 padd-bot-50 text-success">
          <div className="container">
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
                {userdata ? (
                  <tbody>
                    {userdata?.map((item) => (
                      <tr key={item?._id}>
                        <td>
                          <a href="job-detail.html">
                            {" "}
                            <img
                              src={`http://localhost:5000/public/uploads1/seekerprofile/${item?.js_id?.js_profile}`}
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
        {}
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {!userdata ? (
            <Button
              onClick={exportcsv}
              className="btn btn-primary"
              style={{ width: "20rem" }}
            >
              {" "}
              Export To CSV{" "}
            </Button>
          ) : (
            ""
          )}
        </div>
        {/* ====================== End Manage Company ======  ========== */}
      </>
    </>
  );
};

export default AcceptList;
