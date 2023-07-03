export interface AppInputProps {
  label: string;
  name: string;
  placeholder: string;
  size?: any;
  type?: string;
  defaultValue?: string | number;
  onChange?: () => void;
  disabled?: boolean,
}
