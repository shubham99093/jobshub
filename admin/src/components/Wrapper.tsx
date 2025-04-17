import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronRight,
  ContactRound,
  DatabaseBackup,
  Gauge,
  IndianRupee,
  LogOut,
  Menu,
  NotebookText,
  Star,
  UserRoundPen,
  X,
} from "lucide-react";
import { useAdmin } from "../context/adminContext";

function Wrapper({
  children,
  value,
}: {
  children: React.ReactNode;
  value:
    | "home"
    | "backup"
    | "subscrption"
    | "user"
    | "industry"
    | "contect"
    | "review";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { setAccesstoken, setShow } = useAdmin();
  const [active, setActive] = useState(value);
  const navigate = useNavigate();

  const handleFeature = (
    feature: "all" | "user" | "industry" | "contect" | "review",
    value:
      | "home"
      | "backup"
      | "subscrption"
      | "user"
      | "industry"
      | "contect"
      | "review"
  ) => {
    setShow(feature);
    setActive(value);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccesstoken(null);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside
        className={`bg-white text-black p-4 fixed md:relative h-full transition-transform md:w-60 ${
          isOpen ? "w-60 translate-x-0" : "-translate-x-64 md:translate-x-0"
        }`}
      >
        <div className="flex justify-center cursor-pointer">
          <Link to={"/"} className="border-b w-full border-b-gray-200">
            <img src="assets/img/blwhole.png" className="w-32 " />
          </Link>
          <button
            className="absolute top-4 right-4  md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-2 space-y-4 pt-2">
          <div className="border-b w-full border-b-gray-200">
            <Link
              to={"/"}
              onClick={() => handleFeature("all", "home")}
              className={`flex p-2 gap-2 ${
                active === "home" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
            >
              <Gauge className="text-black/80" />
              Home
            </Link>
            <Link
              to={"/backup"}
              className={`flex p-2 gap-2 ${
                active === "backup" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
            >
              <DatabaseBackup className="text-black/80" />
              BackUp
            </Link>
            <Link
              to={"/payment-detail"}
              className={`flex p-2 gap-2 ${
                active === "subscrption" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
            >
              <IndianRupee className="text-black/80" />
              Subscription
            </Link>
          </div>
          <div className="border-b w-full flex flex-col border-b-gray-200 py-2 text-gray-700">
            <h3 className="text-gray-400 font-bold pb-2">F E A T U R E S</h3>

            <div
              className={`flex p-2 justify-between gap-2 ${
                active === "user" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
              onClick={() => handleFeature("user", "user")}
            >
              <div className="flex gap-2">
                <UserRoundPen />
                User
              </div>
              <div>
                {" "}
                <ChevronRight />
              </div>
            </div>
            <div
              className={`flex p-2 justify-between gap-2 ${
                active === "industry" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
              onClick={() => handleFeature("industry", "industry")}
            >
              <div className="flex gap-2">
                <NotebookText />
                Industry
              </div>
              <div>
                {" "}
                <ChevronRight />
              </div>
            </div>
            <div
              className={`flex p-2 justify-between gap-2 ${
                active === "contect" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
              onClick={() => handleFeature("contect", "contect")}
            >
              <div className="flex gap-2">
                <ContactRound />
                Contect
              </div>
              <div>
                {" "}
                <ChevronRight />
              </div>
            </div>
            <div
              className={`flex p-2 justify-between gap-2 ${
                active === "review" ? "bg-gray-200" : "hover:bg-gray-200"
              } rounded font-medium`}
              onClick={() => handleFeature("review", "review")}
            >
              <div className="flex gap-2">
                <Star />
                Review
              </div>
              <div>
                {" "}
                <ChevronRight />
              </div>
            </div>
          </div>
          <div
            onClick={handleLogout}
            className="border-b w-full border-b-gray-200 py-4 pl-2 cursor-pointer"
          >
            <div className="flex gap-2">
              <LogOut />
              <p className="font-bold">Logout</p>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ml-0  transition-all ${
          isOpen ? "md:ml-60" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex items-center">
          <button
            className="text-white mr-4 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1>Header</h1>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}

export default Wrapper;
