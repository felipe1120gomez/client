import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";

export default function AddressForm(props) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);

    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };

    const response = await createAddressApi(formDataTemp, logout);

    if (!response) {
      toast.warning("Error al crear dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  const updateAddress = async (formData) => {
    setLoading(true);

    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };

    const response = await updateAddressApi(address.id, formDataTemp, logout);

    if (!response) {
      toast.warning("Error al actualizar dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }

    setLoading(false);
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Nombre de la dirección"
        placeholder="Nombre de la dirección"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Región"
          placeholder="Estado/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="zip"
          type="text"
          label="Código Postal"
          placeholder="Código Postal"
          onChange={formik.handleChange}
          value={formik.values.zip}
          error={formik.errors.zip}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Teléfono"
          placeholder="Teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear dirección" : "Editar dirección"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(address) {
  return {
    title: address?.attributes.title || "",
    name: address?.attributes.name || "",
    address: address?.attributes.address || "",
    city: address?.attributes.city || "",
    state: address?.attributes.state || "",
    zip: address?.attributes.zip || "",
    phone: address?.attributes.phone || "",
  };
}

function validationSchema() {
  return {
    title: yup.string().required(true),
    name: yup.string().required(true),
    address: yup.string().required(true),
    city: yup.string().required(true),
    state: yup.string().required(true),
    zip: yup.string().required(true),
    phone: yup.string().required(true),
  };
}
