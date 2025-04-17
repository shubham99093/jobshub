import { IIndustrys } from "../utils/types";

const IndustryCards = ({ item }: { item: IIndustrys }) => {
  return (
    <div className="col-md-3 col-sm-6" key={item._id}>
      <div className="utf_category_box_area">
        <div className="utf_category_desc">
          <div className="utf_category_icon">
            {" "}
            <i
              className={
                item?.ind_name === "Web & Software Dev"
                  ? "icon-bargraph"
                  : item?.ind_name === "Data Science & Analitycs"
                  ? "icon-tools"
                  : item?.ind_name === "Accounting & Consulting"
                  ? "ti-briefcase"
                  : item?.ind_name === "Writing & Translations"
                  ? "ti-ruler-pencil"
                  : item?.ind_name === "Sales & Marketing"
                  ? "icon-briefcase"
                  : item?.ind_name === "Graphics & Design"
                  ? "icon-wine"
                  : item?.ind_name === "Digital Marketing"
                  ? "ti-world"
                  : item?.ind_name === "Education & Training"
                  ? "ti-desktop"
                  : ""
              }
              aria-hidden="true"
            />{" "}
          </div>
          <div className="category-detail utf_category_desc_text">
            <h4>{item?.ind_name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCards;
