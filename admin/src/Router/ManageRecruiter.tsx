import { toast } from "react-toastify";
import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";

const ManageRecruiter = () => {
  const { recruiter, setRecruiter } = useAdmin();

  const handleBlock = async (
    id: string | undefined,
    name: string | undefined,
    state: "active" | "block"
  ) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }
    const responce = await fetch(
      `http://localhost:5000/recruiter${state}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    const result: { status: number; error: string } = await responce.json();

    if (result.status !== 201 || result.error) {
      toast.error(result.error);
      return;
    }

    const newRec = recruiter?.map((item) => {
      if (item._id === id) {
        return { ...item, isBlock: state === "block" ? 1 : null };
      } else {
        return item;
      }
    });

    setRecruiter(newRec ? newRec : recruiter);

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
    const responce = await fetch(
      `http://localhost:5000/recruiterlistdel/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const result: { status: number; error: string } = await responce.json();

    if (result.status !== 201 || result.error) {
      toast.error(result.error);
      return;
    }

    setRecruiter(
      recruiter ? recruiter.filter((item) => item._id !== id) : null
    );

    toast.success(`successfully Deleted ${name}`);
  };

  return (
    <Wrapper value="user">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">
            Recruiter Detail
          </h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Manage</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Recruiter</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full bg-white shadow-md rounded-md p-4 flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Recruiter Detail
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className="p-3 text-left">Company Name</th>
                    <th className="p-3 text-left">Recruiter Email</th>
                    <th className="p-3 text-left">Recruiter M.No</th>
                    <th className="p-3 text-left">Recruiter Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recruiter?.map((item, index) => (
                    <tr key={index} className="border-t border-t-gray-200">
                      <td className="p-3">{item.cmp_name}</td>
                      <td className="p-3">{item.cmp_email}</td>
                      <td className="p-3">{item.rec_mno}</td>
                      <td className="p-3">
                        {item.isBlock ? "Blocked" : "Active"}
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() =>
                            handleDelete(item?._id, item?.cmp_name)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleBlock(
                              item?._id,
                              item?.cmp_name,
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

export default ManageRecruiter;
