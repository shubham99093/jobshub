const SelectBox = ({
  label,
  onChange,
  name,
  selected,
  data,
  full = false,
}: {
  data: { label: string }[] | null;
  label: string;
  name: string;
  full?: boolean;
  selected: string | undefined | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div
      className={`${
        full ? "col-md-12 col-sm-12" : "col-md-6 col-sm-6"
      } col-xs-12`}
    >
      <div className="form-group">
        <label>{label}</label>
        <select
          className="wide form-control"
          name={name}
          onChange={onChange}
          value={selected ? selected : ""}
        >
          <option value="" disabled>
            Select
          </option>
          {data?.map((item) => (
            <option value={item.label} selected={item.label === selected}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;
