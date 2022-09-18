import axios from "axios";
import qs from "qs";
import { BASE_PATH } from "../utils/constants";

export async function getLastsGamesApi(limit) {
  try {
    const query = qs.stringify(
      {
        pagination: {
          limit: limit,
        },
        sort: ["createdAt:asc"],
        populate: "*",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const url = `${BASE_PATH}/api/games?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const query = qs.stringify(
      {
        filters: {
          platform: {
            url: {
              $contains: platform,
            },
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
        sort: ["createdAt:asc"],
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/games?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalGamesPlatformApi(platform) {
  try {
    const query = qs.stringify(
      {
        filters: {
          platform: {
            url: {
              $contains: platform,
            },
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/games?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGameByUrlApi(path) {
  try {
    const filters = qs.stringify(
      {
        filters: {
          url: {
            $contains: path,
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/games?${filters}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchGamesApi(title) {
  try {
    const filters = qs.stringify(
      {
        filters: {
          title: {
            $contains: title,
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/games?${filters}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
