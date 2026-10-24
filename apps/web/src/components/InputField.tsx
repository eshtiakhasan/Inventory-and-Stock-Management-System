import type { InputHTMLAttributes, ReactNode } from "react";
import { RefusalMessage } from "./RefusalMessage";

export interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hint?: string;
  error?: string;
  type?: "text" | "tel" | "password";
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  testId: string;
  /** Extra control beside the input, such as the password Show/Hide button. */
  addon?: ReactNode;
}

/**
 * input-field: label above, hint and error linked with aria-describedby,
 * aria-invalid on error. Typed values are kept by the parent form.
 */
export function InputField(props: InputFieldProps) {
  const hintId = props.hint ? `${props.id}-hint` : undefined;
  const errorId = props.error ? `${props.id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      {props.hint ? (
        <p className="field__hint" id={hintId}>
          {props.hint}
        </p>
      ) : null}
      <div className="field__control">
        <input
          id={props.id}
          name={props.id}
          type={props.type ?? "text"}
          value={props.value}
          autoComplete={props.autoComplete}
          inputMode={props.inputMode}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy}
          data-testid={props.testId}
          onChange={(event) => props.onChange(event.target.value)}
          onBlur={props.onBlur}
        />
        {props.addon}
      </div>
      {props.error ? (
        <RefusalMessage id={errorId} message={props.error} />
      ) : null}
    </div>
  );
}
