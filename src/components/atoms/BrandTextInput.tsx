type BrandTextInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: "text" | "password";
  onChange: (value: string) => void;
};

function BrandTextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: BrandTextInputProps) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border"
      />
    </div>
  );
}

export default BrandTextInput;
