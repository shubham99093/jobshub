const infoCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  return (
    <div className="col-md-4 col-sm-6">
      <a title="">
        <div className="utf_category_box_area">
          <div>
            <div className="utf_category_desc">
              <div className="utf_category_icon">
                {" "}
                <i className={icon} aria-hidden="true" />{" "}
              </div>
              <div className="category-detail utf_category_desc_text">
                <h4>{title}</h4>
              </div>
            </div>
          </div>

          <div>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default infoCard;
