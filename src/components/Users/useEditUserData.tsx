import { User } from "@lib/interfaces";
import {
  selectUpdateUserStatus,
  updateUser,
  updateUserLocal,
} from "@store/features/usersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useForm } from "antd/es/form/Form";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useNotificationContext } from "~/context/useNotificationContext";
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
  const dispatch = useAppDispatch();
  const { notification } = useNotificationContext();
  const updateUserStatus = useAppSelector(selectUpdateUserStatus);
  const isUserUpdating = updateUserStatus === "loading";

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

  const onFinish = async (values: FieldData) => {
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
    dispatch(updateUserLocal(updatedUser));
    await dispatch(updateUser(updatedUser));
    notification("User Updated");
    setFormStatus({ isChanged: false, isValid: false });
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
    isUserUpdating,
  };
};

export default useEditUserData;
