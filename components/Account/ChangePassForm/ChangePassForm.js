import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updatePassApi } from "../../../api/user";

export default function ChangePassForm(props) {
  const { user, logout } = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePassApi(user.id, formData.password, logout);
      if (!response || response.error) {
        toast.error("Error actualizando tus datos");
      } else {
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-pass-form">
      <h4>Cambia tu Contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Nueva Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Confirmar Contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: yup
      .string()
      .required(true)
      .min(6, "La contraseña debe tener minimo 6 caracteres")
      .oneOf([yup.ref("repeatPassword")], true),
    repeatPassword: yup
      .string()
      .required(true)
      .min(6, "La contraseña debe tener minimo 6 caracteres")
      .oneOf([yup.ref("password")], true),
  };
}
