export interface RefusalMessageProps {
  id?: string;
  message: string;
}

/** refusal-message: the inline error under a field (danger bar and text). */
export function RefusalMessage({ id, message }: RefusalMessageProps) {
  return (
    <p className="refusal" id={id}>
      {message}
    </p>
  );
}
