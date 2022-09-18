import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/Game/TabsGame";
import { getGameByUrlApi } from "../api/game";
import Seo from "../components/Seo";

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response.data[0]);
    })();
  }, [query]);

  return (
    <BasicLayout className="BasicLayout">
      <Seo title={game?.attributes.title} />
      {!game && <Loader active>Caragndo juego</Loader>}
      {game && (
        <>
          <HeaderGame game={game} />
          <TabsGame game={game} />
        </>
      )}
    </BasicLayout>
  );
}
