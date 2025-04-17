import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RecFooter, RecHeader } from "../../components/recruiterComponents";
import Typewriter from "typewriter-effect";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import nodata from "../../../img/nodata.png";
import { IJobApplication } from "../../utils/types";
import { BACKEND_URL } from "../../config";
const Notification = () => {
  const navigate = useNavigate();
  const [userdata, setuserData] = useState<IJobApplication[] | null>(null);
  const [r, setR] = useState<{ id: string }>();

  const [open, setOpen] = useState(false);
  const [accesstoken] = useState(localStorage.getItem("recruiterToken"));

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    getjobApplieduser();
  }, []);

  const requestoption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`,
      //   s,
    },
  };

  const getjobApplieduser = async () => {
    const response = await fetch(
      `${BACKEND_URL}/getapplieduser`,
      requestoption
    );
    const result = await response.json();
    setuserData(result);
  };

  const acceptHandler = async (id: string) => {
    const confiOption = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await fetch(
      `${BACKEND_URL}/acceptrequest/${id}`,
      confiOption
    );
    const result = await response.json();

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Accept Successfully",
      });
      getjobApplieduser();
    } else {
      toast.error("something wrong");
    }
  };
  const acceptmail = async (id: string) => {
    const configOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(`${BACKEND_URL}/acceptmail/${id}`, configOption);
    const res = await data.json();
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Mail Send On Your Email Id",
      });
    } else {
      toast.error("Try agian for sending mail from your mail id ");
    }
  };

  const rej = (id: string) => {
    setR({
      id: id,
    });
  };

  const rejectHandler = async () => {
    const confiOption = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken?.replace(/"/g, "")}`,
      },
    };

    const response = await fetch(
      `${BACKEND_URL}/rejectrequest/${r?.id}`,
      confiOption
    );
    const result = await response.json();

    if (result.status === 200) {
      toast.success("You Reject This request successfully");
      getjobApplieduser();
      navigate("/applicantlist");
    } else {
      toast.error("something wrong");
    }
  };

  //   const datalist = () => {
  //     {
  //       userdata?.map((item) => (
  //         <tr key={item?._id}>
  //           <td>
  //             <a href="job-detail.html">
  //               {" "}
  //               <img
  //                 src={`${BACKEND_URL}/public/uploads1/seekerprofile/${item?.js_id?.js_profile}`}
  //                 className="avatar-lg"
  //                 alt="Avatar"
  //               />
  //               {item?.js_id?.js_name}
  //             </a>
  //           </td>
  //           <td>{item?.js_id?.js_email}</td>
  //           <td>{item?.js_id?.js_mno}</td>
  //           <td>{item?.js_id?.js_gender}</td>
  //           <td>
  //             <Button
  //               variant="success"
  //               id="md1"
  //               onClick={() => {
  //                 acceptHandler(item?._id);
  //                 acceptmail(item?._id);
  //               }}
  //               style={{ display: "none" }}
  //             >
  //               {" "}
  //               <i className="fa fa-check" />{" "}
  //             </Button>
  //             <Button
  //               variant="danger"
  //               id="md2"
  //               data-toggle="tooltip"
  //               onClick={() => {
  //                 onOpenModal();
  //                 rej(item?._id);
  //               }}
  //               style={{ display: "none" }}
  //             >
  //               {" "}
  //               <i className="fa fa-times" />{" "}
  //             </Button>
  //             <label className="cl-success mrg-5" htmlFor="md1">
  //               {" "}
  //               <i className="fa fa-check" />{" "}
  //             </label>
  //             <label className="cl-danger mrg-5 " htmlFor="md2">
  //               {" "}
  //               <i className="fa fa-times" />{" "}
  //             </label>
  //             <Link
  //               target="_blank"
  //               className="cl-primary mrg-5"
  //               to={`${BACKEND_URL}/public/uploads1/resume/${item?.resume}`}
  //             >
  //               <i className="fa fa-eye" />
  //             </Link>
  //           </td>
  //         </tr>
  //       ));
  //     }
  //   };

  return (
    <>
      <div>
        <>
          <RecHeader />
          <Modal open={open} onClose={onCloseModal} center>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <h3>Are You Sure Want To This Application Reject ? </h3>
              </span>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0 10px 0 10px",
                }}
              >
                <span>
                  <button
                    className="btn btn-m theme-btn3"
                    onClick={() => {
                      rejectHandler();
                      onCloseModal();
                    }}
                  >
                    {" "}
                    <i className="glyphicon glyphicon-ok" />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-m theme-btn2"
                    onClick={() => {
                      onCloseModal();
                    }}
                  >
                    {" "}
                    <i className=" ti-close" />
                  </button>
                </span>
              </div>
            </div>
          </Modal>
          {/* ======================= Page Title ===================== */}

          <div className="page-title">
            <div className="container">
              <div className="page-caption">
                <h2>
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Notification")
                        .pauseFor(2000)
                        .start();
                    }}
                  />
                </h2>
                <p>
                  <Link to="/recruiterhome" title="Home">
                    Home
                  </Link>{" "}
                  <i className="ti-angle-double-right" /> Notification
                </p>
              </div>
            </div>
          </div>
          {/* ======================= End Page Title ===================== */}

          {/* ======================== Manage Job ========================= */}
          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {userdata ? (
                    <tbody>
                      {userdata?.map((item) => (
                        <tr key={item?._id}>
                          <td>
                            <a href="job-detail.html" className="text-success">
                              {" "}
                              <img
                                src={`${BACKEND_URL}/public/uploads1/seekerprofile/${
                                  item?.js_id?.js_profile
                                    ? item?.js_id?.js_profile
                                    : "default.jpg"
                                }`}
                                className="avatar-lg"
                                alt="Avatar"
                                style={{ color: "green" }}
                              />
                              {item?.js_id?.js_name}
                            </a>
                          </td>
                          <td>{item?.js_id?.js_email}</td>

                          <td>{item?.js_id?.js_mno}</td>

                          <td>{item?.js_id?.js_gender}</td>

                          <td>
                            <Button
                              variant="success"
                              id="md1"
                              onClick={() => {
                                acceptHandler(item?._id);
                                acceptmail(item?._id);
                              }}
                              style={{ display: "none" }}
                            >
                              {" "}
                              <i className="fa fa-check" />{" "}
                            </Button>
                            <Button
                              variant="danger"
                              id="md2"
                              data-toggle="tooltip"
                              onClick={() => {
                                onOpenModal();
                                rej(item?._id);
                              }}
                              style={{ display: "none" }}
                            >
                              {" "}
                              <i className="fa fa-trash-o" />{" "}
                            </Button>

                            <label className="cl-success mrg-5" htmlFor="md1">
                              {" "}
                              <i className="fa fa-check" />{" "}
                            </label>
                            <label className="cl-danger mrg-5 " htmlFor="md2">
                              {" "}
                              <i className="fa fa-trash-o" />{" "}
                            </label>
                            <Link
                              target="_blank"
                              className="cl-primary mrg-5"
                              to={`${BACKEND_URL}/public/uploads1/resume/${item?.resume}`}
                            >
                              <i className="fa fa-eye" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      <img src={nodata} style={{ width: "400px" }} />
                    </td>
                  )}
                </table>
                {/* <div className="utf_flexbox_area padd-10">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            {" "}
                                            <a className="page-link" href="#" aria-label="Previous">
                                                {" "}
                                                <span aria-hidden="true">«</span>{" "}
                                                <span className="sr-only">Previous</span>{" "}
                                            </a>{" "}
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            {" "}
                                            <a className="page-link" href="#" aria-label="Next">
                                                {" "}
                                                <span aria-hidden="true">»</span>{" "}
                                                <span className="sr-only">Next</span>{" "}
                                            </a>{" "}
                                        </li>
                                    </ul>
                                </div>*/}
              </div>
            </div>
          </section>
          {/* ====================== End Manage Company ======  ========== */}
        </>
        <RecFooter />
      </div>
    </>
  );
};

export default Notification;
