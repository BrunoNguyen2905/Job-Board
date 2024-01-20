import React, { useRef, useEffect, useState, ReactNode } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type TextInputProps = {
  label?: string;
  name?: string;
  placeholder?: string | null;
  value?: string | null;

  maxLength?: number | null;
  showMaxLength?: boolean | null;
  required?: boolean | null;
  icon?: ReactNode;
  assistiveText?: string | null;
  customValidity?: string | null;
  disabled?: boolean | null;
  size?: "sm" | "md" | "lg";

  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties | undefined;
  inputClassName?: string;
  textboxClassName?: string;
  textboxStyle?: React.CSSProperties | undefined;
  inputStyle?: React.CSSProperties | undefined;
  labelStyle?: React.CSSProperties | undefined;

  onChange?: ((value: string) => void) | null;
  autoFocus?: boolean | null;
  readOnly?: boolean;

  autoComplete?: string;
  id?: string;
  onKeyDown?: React.HtmlHTMLAttributes<HTMLInputElement>["onKeyDown"];
  onClick?: () => void;

  showClearButton?: boolean;
  onClearButton?: () => void;
};

export function TextInput({
  label = undefined,
  name = undefined,
  placeholder = null,
  value = "",
  maxLength = null,
  showMaxLength = null,
  required = null,
  assistiveText = null,
  customValidity = null,
  onChange = null,
  autoFocus = null,
  disabled = null,
  autoComplete = undefined,
  id = undefined,
  onKeyDown = undefined,
  onClick = undefined,

  showClearButton = undefined,
  onClearButton = undefined,

  className = undefined,
  labelClassName = undefined,
  style = undefined,
  textboxClassName = undefined,
  textboxStyle = undefined,
  inputStyle = undefined,
  inputClassName = undefined,
  labelStyle = undefined,
  readOnly = false,
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    inputRef.current?.setCustomValidity(customValidity || "");
  }, [customValidity]);

  function handleInputChange(value: string) {
    setCurrentLength(value.length);
    return value;
  }

  let assistiveTextFinal;

  if (maxLength != undefined && maxLength != null) {
    assistiveTextFinal = `Up to ${maxLength} characters`;
  }

  if (assistiveText) {
    assistiveTextFinal = assistiveText;
  }

  const defaultOnClearButton = () => {
    if (onChange) {
      onChange("");
    } else {
      if (inputRef.current) {
        inputRef.current.value = "";
        handleInputChange("");
      }
    }
  };

  return (
    <div
      className={`bg-[#323242] flex flex-col ${className ? className : ""}`}
      style={style}
    >
      {Boolean(label) && (
        <label
          htmlFor={name}
          className={`pb-4 ${labelClassName ? labelClassName : ""}`}
          style={labelStyle}
        >
          {label} {required ? "*" : ""}
        </label>
      )}

      <div
        className={`flex justify-between border w-full p-2 rounded-md ${
          textboxClassName ? textboxClassName : ""
        }`}
        style={textboxStyle}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          className={`w-full bg-[#323242] focus:bg-inherit focus:outline-none pr-4 ${
            inputClassName ? inputClassName : ""
          }`}
          style={inputStyle}
          type="text"
          placeholder={placeholder || label}
          value={value!}
          maxLength={maxLength!}
          onChange={
            onChange
              ? (e) => {
                  onChange(e.target.value);
                }
              : (e) => handleInputChange(e.target.value)
          }
          required={required!}
          autoFocus={autoFocus!}
          disabled={Boolean(disabled)}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          onClick={onClick}
          readOnly={readOnly}
        />

        {showClearButton && (
          <button
            onClick={onClearButton ? onClearButton : defaultOnClearButton}
          >
            {<FontAwesomeIcon icon={faXmark} size={"sm"} />}
          </button>
        )}
      </div>

      {Boolean(assistiveTextFinal) && (
        <div className="info-row">
          <span>{assistiveTextFinal}</span>
          {(maxLength as number) > 0 &&
            inputRef.current &&
            showMaxLength !== false && (
              <span>
                {currentLength > 0
                  ? currentLength
                  : inputRef.current.value.length}
                /{maxLength}
              </span>
            )}
        </div>
      )}
    </div>
  );
}
