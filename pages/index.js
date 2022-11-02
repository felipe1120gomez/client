import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastsGamesApi } from "../api/game";
import ListGames from "../components/ListGames/ListGames";
import PushNotification from "../components/PushNotification/PushNotification";
import Seo from "../components/Seo";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastsGamesApi(50);
      if (size(response?.data) > 0) setGames(response.data);
      else setGames([]);
    })();
  }, []);

  return (
    <PushNotification>
      <BasicLayout className="home">
        <Seo />
        {!games && <Loader active>Cargando juegos</Loader>}
        {games && size === 0 && (
          <div>
            <h3>No hay juegos</h3>
          </div>
        )}
        {size(games) > 0 && <ListGames games={games} />}
      </BasicLayout>
    </PushNotification>
  );
}
