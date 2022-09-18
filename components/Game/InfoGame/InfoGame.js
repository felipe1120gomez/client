import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshots from "../CarouselScreenshots/";

export default function InfoGame(props) {
  const { game } = props;

  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={game.attributes.video}
        controls={true}
      />
      <CarouselScreenshots
        title={game.attributes.title}
        screenshots={game.attributes.screenshots}
      />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.attributes.summary }} />

        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game.attributes.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
