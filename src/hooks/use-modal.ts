import { useState } from "react";

export const useModal = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const onChangeState = () => {
    setModalStatus(!modalStatus);
  };
  return { modalStatus, onChangeState };
};
