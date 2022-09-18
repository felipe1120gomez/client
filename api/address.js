import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(id, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses?user=${id}`;
    const result = await authFetch(url, null, logout);
    if (result.error) throw "Server error";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressApi(id, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${id}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.error) throw "Server error";
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressApi(id, address, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
