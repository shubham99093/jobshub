import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import { useSeeker } from "../../contexts/SeekerContext";
import PageTitle from "../../components/PageTitle";
import { ISeeker } from "../../utils/types";

interface ISeekerData extends ISeeker {
  js_sub?: string;
  js_msg?: string;
}

function SeekerContact() {
  const { accesstoken, seeker } = useSeeker();
  const [seekerData, setSeekerdata] = useState<ISeekerData | null>(seeker);

  const navigate = useNavigate();

  const conatct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setSeekerdata({
      ...seekerData,
      [name]: value,
    });
  };

  const contactData = async () => {
    const confiOption = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(seekerData),
    };
    const response = await fetch(
      "http://localhost:5000/seekercontact",
      confiOption
    );
    const result = await response.json();

    if (result.status === 201) {
      toast.success("Message Send Successful");
      navigate("/seekerhome");
    } else {
      toast.error("Message Not Send");
    }
  };
  return (
    <>
      <div>
        <SeekerHeader />
        <>
          <PageTitle title="Get In Touch" page="Contact" />
          {/* ================ Fill Forms ======================= */}
          <section className="padd-top-80 padd-bot-70">
            <div className="container">
              <div className="col-md-6 col-sm-6">
                <div className="row">
                  <form className="mrg-bot-40" method="post">
                    <div className="col-md-6 col-sm-6">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="js_name"
                        onChange={(e) => conatct(e)}
                        value={seekerData?.js_name}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="js_email"
                        onChange={(e) => conatct(e)}
                        value={seekerData?.js_email}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <label>Subject:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        name="cont_sub"
                        value={seekerData?.js_sub}
                        onChange={(e) => conatct(e)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <label>Message:</label>
                      <textarea
                        className="form-control height-120"
                        placeholder="Message"
                        defaultValue={""}
                        name="cont_msg"
                        value={seekerData?.js_msg}
                        onChange={(e) => conatct(e)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <button
                        type="button"
                        className="btn theme-btn"
                        name="submit"
                        onClick={contactData}
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.4800956824857!2d72.83435588693416!3d21.205331902122776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f8a783d8555%3A0x80791a879b5cd46!2sS%20V%20Patel%20College!5e1!3m2!1sen!2sin!4v1741937172182!5m2!1sen!2sin"
                  width="100%"
                  height={360}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          </section>
          {/* ================ End Fill Forms ======================= */}
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default SeekerContact;
