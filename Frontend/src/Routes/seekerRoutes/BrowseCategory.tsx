import { Link } from "react-router-dom";
import { SeekerFooter, SeekerHeader } from "../../components/seekerComponents";
import PageTitle from "../../components/PageTitle";
import useIndustries from "../../hooks/useIndustries";
import IndustryCards from "../../components/IndustryCards";
function BrowseCategory() {
  const { industries } = useIndustries();
  return (
    <>
      <div>
        <SeekerHeader />
        <>
          <PageTitle title="Browse by Categories" page="Browse by Categories" />
          {/* ================= Category start ========================= */}
          <section className="padd-top-80 padd-bot-60">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  {industries?.map((item) => (
                    <Link to="/searchjob" title="">
                      <IndustryCards key={item._id} item={item} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default BrowseCategory;
