import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";

const SeekerReview = () => {
  const { seekerReview } = useAdmin();
  return (
    <Wrapper value="review">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">Seeker Reviews</h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Review</p>
            <p>/</p>
            <p className="text-gray-600 font-semibold">Seeker Review</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full p-4 bg-white shadow-md rounded-md flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Seeker Reviews
            </h2>
            {seekerReview && seekerReview?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Seeker Name</th>
                      <th className="p-3 text-left">Seeker Email</th>
                      <th className="p-3 text-left">Seeker Star Rate</th>
                      <th className="p-3 text-left">Seeker suggestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seekerReview.map((item) => {
                      const seeker =
                        typeof item?.seeker_id === "object"
                          ? item.seeker_id
                          : null;
                      return (
                        <tr
                          key={item?._id}
                          className="border-t border-t-gray-200"
                        >
                          <td className="p-3">{seeker?.js_name}</td>
                          <td className="p-3">{seeker?.js_email}</td>
                          <td className="p-3">{item.ratingstar}</td>
                          <td className="p-3 w-150">{item.review}</td>
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

export default SeekerReview;
