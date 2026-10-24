import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

export interface SummaryError {
  fieldId: string;
  message: string;
}

export interface FormErrorSummaryProps {
  id: string;
  /** A form-level message (server or save error), shown first. */
  formMessage?: string;
  /** Field errors, listed only when there are two or more. */
  errors?: readonly SummaryError[];
  /** Changes on every submit, so focus moves to the summary each time. */
  focusKey: number;
  testId: string;
}

/**
 * form-error-summary: at the top of the form after a failed submit. It takes
 * focus so a screen reader reads it once per submit; each link moves focus to
 * its field.
 */
export function FormErrorSummary({
  id,
  formMessage,
  errors = [],
  focusKey,
  testId,
}: FormErrorSummaryProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const listed = errors.length >= 2 ? errors : [];
  const visible = Boolean(formMessage) || listed.length > 0;

  useEffect(() => {
    if (visible) ref.current?.focus();
  }, [focusKey, visible]);

  if (!visible) return null;

  const goTo = (event: MouseEvent<HTMLAnchorElement>, fieldId: string) => {
    event.preventDefault();
    document.getElementById(fieldId)?.focus();
  };

  return (
    <div
      className="error-summary"
      id={id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      data-testid={testId}
    >
      <p className="error-summary__title" id={`${id}-title`}>
        {formMessage ?? t("errors.summary", { count: listed.length })}
      </p>
      {formMessage && listed.length > 0 ? (
        <p>{t("errors.summary", { count: listed.length })}</p>
      ) : null}
      {listed.length > 0 ? (
        <ul>
          {listed.map((error) => (
            <li key={error.fieldId}>
              <a
                href={`#${error.fieldId}`}
                data-testid={`${testId}-link-${error.fieldId}`}
                onClick={(event) => goTo(event, error.fieldId)}
              >
                {error.message}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
