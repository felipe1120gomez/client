import qs from "qs";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logout) {
  try {
    const query = qs.stringify(
      {
        filters: {
          user: {
            id: {
              $contains: idUser,
            },
          },
        },
        sort: ["createdAt:desc"],
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
    const url = `${BASE_PATH}/api/orders?${query}`;
    const result = authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
