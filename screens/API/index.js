import { authentication } from "../../firebase/Config";

// data api
export const dataAPI = async () => {
  const url = "https://api.belajarreactnative.com/top-up.json";
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const unsubscribe = authentication.onAuthStateChanged(async (user) => {
  if (user) {
    const user = authentication.currentUser;
    const uid = user.uid;
    return uid;
  }
});
