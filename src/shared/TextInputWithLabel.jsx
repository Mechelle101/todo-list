function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  maxLength,
}) {
  return (
    <div className="field">
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}

export default TextInputWithLabel;
