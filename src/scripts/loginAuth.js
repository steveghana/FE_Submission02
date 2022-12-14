import axios from "axios";

/**
 * A function to submit a form via POST request to an endpoint
 * @return string token
 * @param userDetails this represents the user information.
 */
export async function formSubmit(userDetails) {
  let errorHandler = document.querySelector(".error__handler");
  errorHandler.innerHTML = "";
  try {
    let {
      data: { access_token, refresh_token },
    } = await axios.post("https://freddy.codesubmit.io/login", userDetails);
    if (!access_token || !refresh_token) return false;
    return { access_token, refresh_token };
  } catch (error) {
    errorHandler.innerHTML = error.response
      ? `${error?.response?.data?.msg}`
      : `${error.message}`;
  }
}
/**
 * A function to store user inputs
 * @returns new data
 * @param data this represent the initial value username:'', password:''.
 */
export function getInputData(data, Form) {
  if (!Form) return;
  [...Form?.querySelectorAll("input")]?.forEach((item) => {
    item.addEventListener("change", (e) => {
      data[e.target.name] = e.target.value;
    });
  });
  return data;
}
