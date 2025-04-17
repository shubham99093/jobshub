import { toast } from "react-toastify";
import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";
import { BACKEND_URL } from "../config";

const ManageSeeker = () => {
  const { seeker, setSeeker } = useAdmin();

  const handleBlock = async (
    id: string | undefined,
    name: string | undefined,
    state: "active" | "block"
  ) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }
    const responce = await fetch(`${BACKEND_URL}/seeker${state}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    const result: { status: number; error: string } = await responce.json();

    if (result.status !== 201 || result.error) {
      toast.error(result.error);
      return;
    }

    const newSe = seeker?.map((item) => {
      if (item._id === id) {
        return { ...item, isBlock: state === "block" ? 1 : null };
      } else {
        return item;
      }
    });

    setSeeker(newSe ? newSe : seeker);

    toast.success(`successfully ${state} ${name}`);
  };

  const handleDelete = async (
    id: string | undefined,
    name: string | undefined
  ) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }
    const responce = await fetch(`${BACKEND_URL}/seekerlistdel/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result: { status: number; error: string } = await responce.json();

    if (result.status !== 201 || result.error) {
      toast.error(result.error);
      return;
    }

    setSeeker(seeker ? seeker.filter((item) => item._id !== id) : null);

    toast.success(`successfully Deleted ${name}`);
  };

  return (
    <Wrapper value="user">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">Seeker Detail</h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Manage</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Seeker</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full bg-white shadow-md rounded-md p-4 flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Seeker Detail
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className=" p-3 text-left">Seeker Name</th>
                    <th className=" p-3 text-left">Seeker Email</th>
                    <th className=" p-3 text-left">Seeker M.No</th>
                    <th className=" p-3 text-left">Seeker Status</th>
                    <th className=" p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {seeker?.map((item, index) => (
                    <tr key={index} className="border-t border-t-gray-200">
                      <td className=" p-3">{item?.js_name}</td>
                      <td className=" p-3">{item?.js_email}</td>
                      <td className=" p-3">{item?.js_mno}</td>
                      <td className=" p-3">
                        {item.isBlock ? "Blocked" : "Active"}
                      </td>
                      <td
                        onClick={() => handleDelete(item?._id, item?.js_name)}
                        className=" p-3 space-x-2"
                      >
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleBlock(
                              item?._id,
                              item?.js_name,
                              item?.isBlock ? "active" : "block"
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          {item?.isBlock ? "Active" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ManageSeeker;
