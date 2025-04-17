import Wrapper from "../components/Wrapper";
import { useAdmin } from "../context/adminContext";

const reviews = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    subject: "Great Service",
    message: "I loved the experience!",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Feedback",
    message: "Could improve response time.",
  },
  {
    id: 3,
    user: "Michael Brown",
    email: "michael@example.com",
    subject: "Issue",
    message: "Had trouble logging in.",
  },
  {
    id: 4,
    user: "Emily Davis",
    email: "emily@example.com",
    subject: "Support",
    message:
      "Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem Customer support was helpful! lorem ",
  },
  {
    id: 3,
    user: "Michael Brown",
    email: "michael@example.com",
    subject: "Issue",
    message: "Had trouble logging in.",
  },
];

const PaymentDetail = () => {
  const { payment } = useAdmin();
  return (
    <Wrapper value="subscrption">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">Payment</h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Payment</p>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="w-full p-4 bg-white shadow-md rounded-md flex justify-center items-between flex-col">
            <h2 className="text-lg text-[#606fb9] font-semibold mb-4 pl-2">
              Payment Detail
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Payee's Name</th>
                    <th className="p-3 text-left">Compony Name</th>
                    <th className="p-3 text-left">Payee's Email</th>
                    <th className="p-3 text-left">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {payment?.map((item) => {
                    const payee =
                      typeof item.paymentby === "object"
                        ? item.paymentby
                        : null;
                    return (
                      <tr
                        key={item?._id}
                        className="border-t border-t-gray-200"
                      >
                        <td className="p-3">{payee?.cmp_owner}</td>
                        <td className="p-3">{payee?.cmp_name}</td>
                        <td className="p-3">{payee?.cmp_email}</td>
                        <td className="p-3">{item?.packagename}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PaymentDetail;
