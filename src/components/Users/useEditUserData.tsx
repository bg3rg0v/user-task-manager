import { User } from "@lib/interfaces";
import { useForm } from "antd/es/form/Form";
import { isEmpty } from "lodash";
import { useState } from "react";
interface FieldData {
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
}

const initialFormStatus = {
  isChanged: false,
  isValid: true,
};

const useEditUserData = (user: User) => {
  const [form] = useForm<FieldData>();

  const [formStatus, setFormStatus] = useState(initialFormStatus);

  const originalValues: FieldData = {
    username: user.username,
    email: user.email,
    street: user.address.street,
    suite: user.address.suite,
    city: user.address.city,
  };

  const handleFieldsChange = () => {
    if (!form.isFieldsTouched()) {
      setFormStatus((prev) => ({ ...prev, isChanged: false }));
      return;
    }

    const currentValues = form.getFieldsValue();

    const isValid = Object.values(currentValues).every(
      (value) => !isEmpty(value)
    );
    setFormStatus((prev) => ({ ...prev, isValid }));

    const isChanged = Object.keys(originalValues).some(
      (key) =>
        currentValues[key as keyof FieldData] !==
        originalValues[key as keyof FieldData]
    );
    setFormStatus((prev) => ({ ...prev, isChanged }));
  };

  const onFinish = (values: FieldData) => {
    console.log("Submitted values:", values);

    const updatedUser = {
      ...user,
      username: values.username,
      email: values.email,
      address: {
        ...user.address,
        street: values.street,
        suite: values.suite,
        city: values.city,
      },
    };

    console.log("Updated user:", updatedUser);
  };

  const handleReset = () => {
    form.resetFields();
    setFormStatus(initialFormStatus);
  };

  return {
    form,
    formStatus,
    originalValues,
    handleReset,
    onFinish,
    handleFieldsChange,
  };
};

export default useEditUserData;
