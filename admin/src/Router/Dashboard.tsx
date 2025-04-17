import { BriefcaseBusiness, Users, NotepadText } from "lucide-react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/adminContext";

const Dashboard = () => {
  const { show } = useAdmin();

  const {
    recruiter,
    seeker,
    industry,
    recruiterContect,
    seekerContect,
    recruiterReview,
    seekerReview,
    payment,
  } = useAdmin();

  return (
    <Wrapper value={show === "all" ? "home" : show}>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">Dashboard</h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Dashboard</p>
          </div>
        </div>
        <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <Link
            to="/manage-recruiter"
            onClick={() => {}}
            className={`${
              show === "all" || show === "user" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-md font-semibold">RECRUITER</p>
              <p className="text-2xl text-gray-600 font-bold">
                {recruiter?.length}
              </p>
            </div>
            <BriefcaseBusiness size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/manage-seeker"
            className={`${
              show === "all" || show === "user" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">SEEKER</p>
              <p className="text-2xl text-gray-600 font-bold">
                {seeker?.length}
              </p>
            </div>
            <Users size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/view-industry"
            className={`${
              show === "all" || show === "industry" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">INDUSTRY</p>
              <p className="text-2xl text-gray-600 font-bold">
                {industry?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/view-recruiter-contect"
            className={`${
              show === "all" || show === "contect" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">
                RECRUITER CONTECT
              </p>
              <p className="text-2xl text-gray-600 font-bold">
                {recruiterContect?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/view-seeker-contect"
            className={`${
              show === "all" || show === "contect" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">SEEKER CONTECT</p>
              <p className="text-2xl text-gray-600 font-bold">
                {seekerContect?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/recruiter-review"
            className={`${
              show === "all" || show === "review" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">
                RECRUITER REVIEW
              </p>
              <p className="text-2xl text-gray-600 font-bold">
                {recruiterReview?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/seeker-review"
            className={`${
              show === "all" || show === "review" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">SEEKER REVIEW</p>
              <p className="text-2xl text-gray-600 font-bold">
                {seekerReview?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
          <Link
            to="/payment-detail"
            className={`${
              show === "all" ? "flex" : "hidden"
            } bg-white shadow-md rounded-md p-4 justify-between items-center w-auto h-30 cursor-pointer`}
          >
            <div>
              <p className="text-black text-sm font-semibold">PAYMENTS</p>
              <p className="text-2xl text-gray-600 font-bold">
                {payment?.length}
              </p>
            </div>
            <NotepadText size={32} className="text-blue-500" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
