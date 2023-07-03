// Ant Components
import { Form, Input } from 'antd';

// Utils
import { useFormInput } from '../../utils/useFormInput';

// Interfaces
import { AppInputProps } from '../../types/CommonInterface';


const AppInput = ({ ...args }: AppInputProps) => {
  const { label, name, size, type, defaultValue, onChange, disabled, placeholder} = args;
  const formControl = useFormInput(name);

  return (
    <>
      <label className="fs-14 fw-600">{label}</label>
      <Form.Item
        {...formControl}
        style={{ marginBottom: "8px" }}
      >
        <Input
          size={size}
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{ marginTop: "2px", height: "40px", }}
        />
      </Form.Item>
    </>
  )
}

export default AppInput