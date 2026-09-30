import * as React from 'react';
/** Labeled text input / textarea for the 도입 상담 form. 52px tall, 12px radius, blue focus ring — echoes the product's contact fields. */
export interface FieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  type?: 'text' | 'tel' | 'email' | 'url';
  required?: boolean;
  hint?: string;
  error?: string;
  name?: string;
  style?: React.CSSProperties;
}
export function Field(props: FieldProps): JSX.Element;
