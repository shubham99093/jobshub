import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Load from "../../Load";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../components/PageTitle";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function Payment() {
  const [accesstoken] = useState(localStorage.getItem("recruiterToken"));
  const navigate = useNavigate();
  const paymentHandler = async (amount: number, packagename: string) => {
    const _data = { amount, packagename };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_data),
    };
    const response = await fetch("http://localhost:5000/order", requestOptions);
    const result: {
      data: { id: string; currency: string };
      massage: string;
      statue: number;
      error: string;
    } = await response.json();
    if (result.statue !== 200) {
      toast.error(result.massage || result.error);
    }

    razerpayopenHandle(result.data, packagename, amount);
  };

  const razerpayopenHandle = (
    data: { id: string; currency: string },
    packagename: string,
    amount: number
  ) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK is not loaded");
      return;
    }
    const options = {
      key: "rzp_test_L3pobtZ5kdnek9",
      amount: Number(amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "JOB'S HUB",
      description: "Test Transaction",
      image: "assets/img/blwhole-payment.png.jpg",
      order_id: data.id,
      notes: {
        address: "JOB'S HUB payment",
      },
      theme: {
        color: "#009ee5",
      },
      handler: async (response: RazorpayResponse) => {
        const requestOptions1 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
          body: JSON.stringify({ ...response, packagename }),
        };
        const res = await fetch(
          "http://localhost:5000/verify",
          requestOptions1
        );
        const result = await res.json();
        if (result.status === 200) {
          toast.success("payment success");
          navigate("/recruiterhome");
        } else {
          toast.error("payment failed please try again later");
          navigate("/payment");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div>
        <Load />
        <RecHeader />
        <>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,300,700,100"
            rel="stylesheet"
            type="text/css"
          />

          <PageTitle title="JOB'S HUB" page="Subscription" />
          <a target="blank" href="http://www.digimadmedia.com"></a>
          <div className="price-table-wrapper">
            {/* <a target="blank" href="http://www.digimadmedia.com"></a> */}
            <div className="pricing-table">
              {/* <a target="blank" href="http://www.digimadmedia.com"> </a> */}
              <h2 className="pricing-table__header">- PLATINUM -</h2>
              <h3 className="pricing-table__price">
                4000 <span style={{ fontFamily: "sans-serif" }}>&#8377; </span>
              </h3>
              <button
                id="buy"
                style={{ border: "none", width: "100%" }}
                className="pricing-table__button"
                onClick={() => paymentHandler(4000, "PLATINUM")}
              >
                PLATINUM
              </button>

              <ul className="pricing-table__list">
                <li>4 Job Post</li>
                <li>Unlimited Resume Access</li>
                <li>24 hour support</li>
              </ul>
            </div>

            <div className="pricing-table featured-table">
              <h2 className="pricing-table__header">- GOLD -</h2>
              <h3 className="pricing-table__price" style={{ color: "#dab842" }}>
                2000 <span style={{ fontFamily: "sans-serif" }}>&#8377; </span>
              </h3>
              <button
                className="pricing-table__button_gld"
                style={{ border: "none", width: "100%" }}
                onClick={() => paymentHandler(2000, "GOLD")}
              >
                GOLD
              </button>

              <ul className="pricing-table__list">
                <li>2 Job Post</li>
                <li>Unlimited Resume Access</li>
                <li>Only Company Working Time</li>
              </ul>
            </div>

            <div className="pricing-table">
              <h2 className="pricing-table__header">- SILVER -</h2>
              <h3 className="pricing-table__price" style={{ color: "#7e888e" }}>
                1000 <span style={{ fontFamily: "sans-serif" }}>&#8377; </span>
              </h3>
              <button
                id="buy"
                className="pricing-table__button_slv"
                style={{ border: "none", width: "100%" }}
                onClick={() => paymentHandler(1000, "SILVER")}
              >
                SILVER
              </button>

              <ul className="pricing-table__list">
                <li>1 Job Post</li>
                <li>Unlimited Resume Access</li>
                <li>No Support</li>
              </ul>
            </div>
          </div>

          <RecFooter />
        </>
      </div>
    </>
  );
}

export default Payment;
