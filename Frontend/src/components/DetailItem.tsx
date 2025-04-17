const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => {
  return (
    <li>
      <div className="col-md-3 col-sm-3 col-xs-12 detail_tag">{label}</div>
      <div className="col-md-6 col-sm-4 col-xs-12">{value}</div>
    </li>
  );
};

export default DetailItem;
