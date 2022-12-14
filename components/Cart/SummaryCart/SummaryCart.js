import React, { useState, useEffect } from "react";
import { Image, Icon, Table } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const { removeProductCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.attributes.price;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.attributes.url)}
                  />
                  <Image
                    src={product.attributes.poster.data.attributes.url}
                    alt={product.attributes.title}
                  />
                  {product.attributes.title}
                </Table.Cell>
                <Table.Cell>
                  {product.attributes.platform.data.attributes.title}
                </Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>{product.attributes.price} $</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                {totalPrice.toFixed(2)} $
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
