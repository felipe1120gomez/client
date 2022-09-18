import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  const { game, total, createdAt, address } = order.attributes;
  const { title, poster, url } = game.data.attributes;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.data.attributes.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{total} $</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        address={address}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, address, title } = props;

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente dirección:</h3>
      <div>
        <p>{address.attributes.name}</p>
        <p>{address.attributes.address}</p>
        <p>
          {address.attributes.state}, {address.attributes.city}{" "}
          {address.attributes.zip}
        </p>
        <p>{address.attributes.phone}</p>
      </div>
    </BasicModal>
  );
}
