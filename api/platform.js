import axios from "axios";
import { BASE_PATH } from "../utils/constants";

export async function getPlatformApi() {
  try {
    const url = `${BASE_PATH}/api/platforms?__sort=position:asc`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
