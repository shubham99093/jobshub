import {
  AcceptUserList,
  RejectUserList,
} from "../../components/recruiterComponents";
import Load from "../../Load";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import PageTitle from "../../components/PageTitle";

const ApplicationList = () => {
  return (
    <>
      <div>
        <>
          <Load />
          <RecHeader />
          <PageTitle title="User List" page="User List" />
          {/* ======================== Manage Job ========================= */}
          <div className="tabs">
            <div className="tab-2">
              <label htmlFor="tab2-1">
                <h4> Acception List</h4>{" "}
              </label>
              <input id="tab2-1" name="tabs-two" type="radio" defaultChecked />
              <div>
                <AcceptUserList />
              </div>
            </div>
            <div className="tab-2">
              <label htmlFor="tab2-2">
                <h4>Rejection List</h4>
              </label>
              <input id="tab2-2" name="tabs-two" type="radio" />
              <div>
                <RejectUserList />
              </div>
            </div>
          </div>

          {/* ====================== End Manage Company ======  ========== */}
          <RecFooter />
        </>
      </div>
    </>
  );
};

export default ApplicationList;
