import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping(props) {
  const { setAddress } = props;
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await getAddressesApi(auth.idUser, logout);
        setAddresses(response.data || []);
      }
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envió</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna direccion creada{" "}
            <Link href="/account">
              <a>añadir tu primera dirección.</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address(props) {
  const { address, addressActive, setAddressActive, setAddress } = props;

  const changeAddress = () => {
    setAddressActive(address.id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address.id,
      })}
      onClick={changeAddress}
    >
      <p>{address.attributes.title}</p>
      <p>{address.attributes.name}</p>
      <p>{address.attributes.address}</p>
      <p>
        {address.attributes.city}, {address.attributes.state}{" "}
        {address.attributes.zip}
      </p>
      <p>{address.attributes.phone}</p>
    </div>
  );
}
