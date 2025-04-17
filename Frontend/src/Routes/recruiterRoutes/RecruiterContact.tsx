import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import { useRecruiter } from "../../contexts/RecruiterContext";
import { IRecruiter } from "../../utils/types";
import PageTitle from "../../components/PageTitle";
function RecruiterContact() {
  const [inputdata, setInputdata] = useState<IRecruiter | null>({});
  const { recruiter, accesstoken } = useRecruiter();
  const navigate = useNavigate();

  useEffect(() => {
    setInputdata(recruiter);
  }, [recruiter]);

  const contact = ({ name, value }: { name: string; value: string }) => {
    setInputdata({
      ...inputdata,
      [name]: value,
    });
  };

  const sendcontact = async (e: React.MouseEvent) => {
    e.preventDefault();
    const confiOption = {
      method: "post",
      body: JSON.stringify(inputdata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await fetch(
      "http://localhost:5000/reccontact",
      confiOption
    );
    const result = await response.json();

    if (result.status === 201) {
      toast.success("Message Send Successful");
      navigate("/recruiterhome");
    } else {
      toast.error("Message Not Send");
    }
  };
  return (
    <>
      <div>
        <RecHeader />
        <>
          <PageTitle title="Get In Touch" page="Contact" />

          {/* ================ Fill Forms ======================= */}
          <section className="padd-top-80 padd-bot-70">
            <div className="container">
              <div className="col-md-6 col-sm-6">
                <div className="row">
                  <form className="mrg-bot-40">
                    <div className="col-md-6 col-sm-6">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={inputdata?.cmp_name}
                        onChange={(e) => contact(e.target)}
                        name="cmp_name"
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="cmp_email"
                        value={inputdata?.cmp_email}
                        onChange={(e) => contact(e.target)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <label>Subject:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        name="cont_sub"
                        onChange={(e) => contact(e.target)}
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <label>Message:</label>
                      <textarea
                        className="form-control height-120"
                        placeholder="Message"
                        defaultValue={""}
                        onChange={(e) => contact(e.target)}
                        name="cont_msg"
                      />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <button
                        className="btn theme-btn"
                        name="submit"
                        onClick={sendcontact}
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
        <RecFooter />
      </div>
    </>
  );
}

export default RecruiterContact;
