import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response) {
        toast.error("Error actualizando tus datos");
      } else {
        setReloadUser(true);
        formik.handleReset();
        toast.success("No se permite cambiar el email");
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email<span>(Tu email actual: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Nuevo Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirmar Email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
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
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: yup
      .string()
      .email(true)
      .required(true)
      .oneOf([yup.ref("repeatEmail")], true),
    repeatEmail: yup
      .string()
      .email(true)
      .required(true)
      .oneOf([yup.ref("email")], true),
  };
}
