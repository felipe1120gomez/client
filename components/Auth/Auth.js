import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterFrom from "./RegisterForm";

export default function Auth(props) {
  const { onCloseModal, setModalTitle } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setModalTitle("Inciar sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setModalTitle("Registrase");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterFrom showLoginForm={showLoginForm} />
  );
}
