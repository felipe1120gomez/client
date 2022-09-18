import qs from "qs";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const filters = qs.stringify(
      {
        filters: {
          user: {
            id: {
              $contains: idUser,
            },
          },
          game: {
            id: {
              $contains: idGame,
            },
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const url = `${BASE_PATH}/api/favorites?${filters}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound.data) > 0) return "Ya esta en favoritos";
    else {
      const url = `${BASE_PATH}/api/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { user: idUser, game: idGame } }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound.data) > 0) {
      const url = `${BASE_PATH}/api/favorites/${dataFound.data[0].id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      if (result.error) throw "Server error";
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logout) {
  try {
    const filters = qs.stringify(
      {
        filters: {
          user: {
            id: {
              $contains: idUser,
            },
          },
        },
        populate: {
          game: {
            populate: "*",
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const url = `${BASE_PATH}/api/favorites?${filters}`;
    const result = await authFetch(url, null, logout);
    return result.data ? result.data : result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
