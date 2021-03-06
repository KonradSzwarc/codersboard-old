import React from 'react';
import { Form, Input } from 'antd';

import { FieldProps } from 'formik/dist/Field';
import { FormItemProps } from 'antd/es/form';
import { InputProps } from 'antd/es/input';

import { getStatus } from 'components/formik/helpers';

type Props = { autoComplete?: string } & FormItemProps & InputProps & FieldProps;

const FormikInput = ({ form, field: { name, onChange, onBlur, value }, ...props }: Props) => {
  const errorMessage = form.touched[name] && form.errors[name];
  const help = errorMessage || props.help || undefined;
  const validateStatus = getStatus(form, errorMessage as string);

  return (
    <Form.Item
      label={props.label}
      required={props.required}
      validateStatus={validateStatus}
      help={help}
      colon={props.colon}
    >
      <Input
        name={name}
        autoComplete={props.autoComplete}
        addonAfter={props.addonAfter}
        addonBefore={props.addonBefore}
        disabled={props.disabled}
        id={props.id}
        prefix={props.prefix}
        size={props.size}
        suffix={props.suffix}
        type={props.type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onPressEnter={props.onPressEnter}
        allowClear={props.allowClear}
      />
    </Form.Item>
  );
};

export default FormikInput;
