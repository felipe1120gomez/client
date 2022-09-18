import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowsize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../utils/breakpoint";

export default function ListGames(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game key={game.id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game(props) {
  const { game, key } = props;

  return (
    <Grid.Column className="list-games__game" key={key}>
      <Link href={`/${game.attributes.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image
              src={game.attributes.poster.data.attributes.url}
              alt={game.attributes.title}
            />
            <div className="list-games__game-poster-info">
              {game.attributes.discount ? (
                <span className="discount">-{game.attributes.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">{game.attributes.price}$</span>
            </div>
          </div>
          <h2>{game.attributes.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
