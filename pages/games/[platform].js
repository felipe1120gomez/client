import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";

const limitPerPage = 1;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setToTalGames] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response.data);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setToTalGames(response.data.length);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Caragndo juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No ha juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
