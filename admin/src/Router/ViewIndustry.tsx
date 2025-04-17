import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";
import { toast } from "react-toastify";

const ViewIndustry = () => {
  const { industry, setIndustry } = useAdmin();
  const navigate = useNavigate();

  const handleDelete = async (
    id: string | undefined,
    name: string | undefined
  ) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }
    const responce = await fetch(`http://localhost:5000/industrydel/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result: { status: number; error: string } = await responce.json();

    if (result.status !== 201 || result.error) {
      toast.error(result.error);
      return;
    }

    setIndustry(industry ? industry.filter((item) => item._id !== id) : null);

    toast.success(`successfully Deleted ${name}`);
  };

  const handleUpdate = (id: string, name: string) => {
    navigate("/update-industry", { state: { id, indName: name } });
  };

  return (
    <Wrapper value="industry">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">
            Industry Detail
          </h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Industry</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">View Industry</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full bg-white shadow-md rounded-md p-4 flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              View Industry
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className=" p-3 text-left">No</th>
                    <th className=" p-3 text-left">Industry Name</th>
                    <th className=" p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {industry?.map((item, index) => (
                    <tr key={index} className="border-t border-t-gray-200">
                      <td className=" p-3">{index + 1}</td>
                      <td className=" p-3">{item.ind_name}</td>
                      <td className=" p-3 space-x-2">
                        <button
                          onClick={() => handleUpdate(item._id, item.ind_name)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.ind_name)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Link to="/add-industry">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2">
            Add Industry
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ViewIndustry;
