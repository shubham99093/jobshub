import { toast } from "react-toastify";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { IIndustrys } from "../utils/types";
import { useAdmin } from "../context/adminContext";
import { useNavigate } from "react-router-dom";

const AddIndustry = () => {
  const { industry, setIndustry } = useAdmin();
  const [indName, setIndName] = useState("");
  const navigate = useNavigate();

  const handleAddindustry = async () => {
    if (indName.trim() === "") {
      toast.error("Enter industry name");
      return;
    }
    const responce = await fetch(`http://localhost:5000/addindustry`, {
      method: "POST",
      body: JSON.stringify({ ind_name: indName }),
      headers: { "Content-Type": "application/json" },
    });

    const result: { status: number; error: string; data: IIndustrys } =
      await responce.json();

    if (result.status !== 200 || result.error) {
      toast.error(result.error);
      return;
    }

    setIndustry(industry ? [...industry, result.data] : [result.data]);
    toast.success(`successfully ${indName} Added`);
    navigate("/view-industry");
  };

  return (
    <Wrapper value="industry">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">
            Manage Industry
          </h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Industry</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Manage Industry</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-96 p-4 bg-white shadow-md rounded-md flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Add Industry
            </h2>
            <div className="mt-4">
              <p>Industry Name</p>
              <div className="mt-2 flex w-auto items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setIndName(e.target.value)}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  placeholder="Enter Industry Name"
                />
              </div>
            </div>
            <button
              onClick={handleAddindustry}
              className="w-40 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3"
            >
              Add Industry
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddIndustry;
