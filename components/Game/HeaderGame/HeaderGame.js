import { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";

export default function HeaderGame(props) {
  const { game } = props;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image
          src={game.attributes.poster.data.attributes.url}
          alt={game.attributes.title}
          fluid
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { game } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [realoadFavorite, setRealoadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await isFavoriteApi(auth.idUser, game.id, logout);
        if (size(response.data) > 0) setIsFavorite(true);
        else setIsFavorite(false);
      }
    })();
    setRealoadFavorite(false);
  }, [game, realoadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setRealoadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setRealoadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {game.attributes.title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: game.attributes.summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy__price">
          <p>Precio: {game.attributes.price}$</p>
          <div className="header-game__buy-price-actions">
            <p>-{game.attributes.discount}%</p>
            <p>
              {(
                game.attributes.price -
                Math.floor(game.attributes.price * game.attributes.discount) /
                  100
              ).toFixed(2)}
              $
            </p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(game.attributes.url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
