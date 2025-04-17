import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";

const SeekerContect = () => {
  const { seekerContect } = useAdmin();
  return (
    <Wrapper value="contect">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">
            Seeker Contect Detail
          </h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Contact</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Seeker Contect</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full p-4 bg-white shadow-md rounded-md flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Seeker Contect Detail
            </h2>
            {seekerContect && seekerContect?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Sr. No</th>
                      <th className="p-3 text-left">User Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-left">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seekerContect?.map((item, index) => {
                      const seeker =
                        typeof item.seeker_id === "object"
                          ? item.seeker_id
                          : null;
                      return (
                        <tr
                          key={item._id}
                          className="border-t border-t-gray-200"
                        >
                          <td className="p-3 ">{index + 1}</td>
                          <td className="p-3">{seeker?.js_name || "N/A"}</td>
                          <td className="p-3">{seeker?.js_email || "N/A"}</td>
                          <td className="p-3">
                            {item?.cont_sub || "No Subject"}
                          </td>
                          <td className="p-3 w-150">
                            {item?.cont_msg || "No Message"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SeekerContect;
