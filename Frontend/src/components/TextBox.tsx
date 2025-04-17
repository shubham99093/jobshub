const TextBox = ({
  label,
  onChange,
  value,
  name,
  placeholder = label,
  type = "text",
}: {
  type?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  name: string;
  placeholder?: string;
}) => {
  return (
    <div className="col-md-6 col-sm-6 col-xs-12">
      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default TextBox;
