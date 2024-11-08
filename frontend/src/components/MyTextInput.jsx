import { TextInput, Label } from "flowbite-react";

export function MyTextInput({
  labelText,
  placeholderText,
  className,
  value,
  onChange,
}) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <Label className="w-1/5" value={labelText} />
      <TextInput
        className="w-4/5"
        id="input-gray"
        placeholder={placeholderText}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
