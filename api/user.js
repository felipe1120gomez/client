import axios from "axios";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function registerApi(formData) {
  try {
    const url = `${BASE_PATH}/api/auth/local/register`;
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${BASE_PATH}/api/auth/local`;
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  try {
    const url = `${BASE_PATH}/api/auth/forgot-password`;
    const body = { email: email };
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/api/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateNameApi(id, data, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// No se permite cambiar el email
export async function updateEmailApi(id, email, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePassApi(id, password, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
