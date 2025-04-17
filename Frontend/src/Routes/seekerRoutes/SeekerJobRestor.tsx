import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import moment from "moment";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import nodata from "../../../img/nodata.png";
import PageTitle from "../../components/PageTitle";
import { useSeeker } from "../../contexts/SeekerContext";
import { IExtendedJob } from "../../utils/types";
import { BACKEND_URL } from "../../config";

function SeekerJobRestor() {
  const [trashJob, setTrashJob] = useState<IExtendedJob[] | null>(null);
  const { accesstoken } = useSeeker();
  const navigate = useNavigate();

  useEffect(() => {
    calldata();
  }, []);

  const calldata = async () => {
    try {
      const configOption = {
        methodP: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      };
      const data = await fetch(`${BACKEND_URL}/jobrestore`, configOption);
      const result = await data.json();
      setTrashJob(result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJobHandler = async (id: string | undefined) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          del();
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your Application has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Application is safe :)",
            "error"
          );
        }
      });

    const del = async () => {
      const configOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      };
      const data = await fetch(
        `${BACKEND_URL}/seekerapplydel/${id}`,
        configOption
      );
      const result = await data.json();
      if (result.status === 201) {
        calldata();
      }
    };
  };

  const restoreHandle = async (id: string | undefined) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const restore = await fetch(`${BACKEND_URL}/jobapplyrestore/${id}`, config);
    const result = await restore.json();
    if (result.status === 201) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Your Job Post Restore",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/jobhistory");
    }
  };

  return (
    <>
      <div>
        <>
          <SeekerHeader />

          <PageTitle
            title="Seeker Apply Job Restore"
            page="Seeker Jobs Restore"
          />
          {/* ======================== Manage Job ========================= */}
          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Recruiter Name</th>
                      <th>Trash Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {trashJob && trashJob?.length > 0 ? (
                    <tbody>
                      {trashJob?.map((item) => (
                        <tr>
                          <td>
                            <i className="ti-user" />
                            {item?.rec_id?.cmp_name}
                          </td>
                          <td>{moment(item.updatedAt).format("DD/MM/YYYY")}</td>
                          <td>
                            <button
                              className="cl-success mrg-5 fa fa-edit"
                              data-toggle="tooltip"
                              data-original-title="Update"
                              onClick={() => restoreHandle(item?._id)}
                            ></button>
                            <Link
                              to="/seekerjobrestor"
                              className="cl-danger mrg-5"
                              data-toggle="tooltip"
                              onClick={() => deleteJobHandler(item._id)}
                            >
                              {" "}
                              <i className="fa fa-trash-o" />{" "}
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
                {trashJob && trashJob.length > 20 ? (
                  <div className="utf_flexbox_area padd-10">
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
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
          {/* ====================== End Manage Company ======  ========== */}
        </>
        <SeekerFooter />
      </div>
    </>
  );
}
export default SeekerJobRestor;
