import { Rule } from "antd/lib/form";

export const useFormInput = (name: string, rules?: Rule[]) => {
  return {
    name,
    // ================= Incase if label =================
    // rules: rules ?? [{ required: true, message: `${label} is required` }],

    rules: rules ?? [{ required: true, message: `Required field` }],
  };
};
