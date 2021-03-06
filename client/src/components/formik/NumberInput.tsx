import React from 'react';
import { Form, InputNumber } from 'antd';

import { FormItemProps } from 'antd/es/form';
import { InputNumberProps } from 'antd/lib/input-number';
import { FieldProps } from 'formik/dist/Field';

import { getStatus } from 'components/formik/helpers';

type Props = FormItemProps & InputNumberProps & FieldProps;

const NumberInput = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);
  const handleChange = (value: number) => {
    form.setFieldValue(name, value);
  };

  return (
    <Form.Item
      label={props.label}
      required={props.required}
      validateStatus={validateStatus}
      help={help}
      colon={props.colon}
    >
      <InputNumber
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        formatter={props.formatter}
        max={props.max}
        min={props.min}
        parser={props.parser}
        precision={props.precision}
        decimalSeparator={props.decimalSeparator}
        size={props.size}
        step={props.step}
      />
    </Form.Item>
  );
};

export default NumberInput;
