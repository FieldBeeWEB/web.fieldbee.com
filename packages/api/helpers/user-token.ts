import { addMinutes } from "date-fns";
import { localStorageKeys } from "./local-storage-keys";

export interface UserToken {
  expires_in: number;
  access_token: string;
  refresh_token: string;
  expires_at: Date;
}

export const setUserToken = (userToken: UserToken | null) => {
  localStorage.setItem(localStorageKeys.USER_TOKEN, JSON.stringify(userToken));
};

export const deleteUserToken = () => {
  setUserToken(null);
};

export const getUserToken = (): UserToken | null => {
  try {
    const userToken: any = JSON.parse(
      localStorage.getItem(localStorageKeys.USER_TOKEN) ?? "null"
    );

    if (userToken === null) {
      return null;
    }

    ["expires_in", "access_token", "refresh_token"].forEach((key) => {
      if (!(key in userToken)) {
        throw new Error(`Missing key: ${key}`);
      }
    });

    return userToken;
  } catch (err: any) {
    console.error(`Error parsing user token ${err.message}`);
    deleteUserToken();
    return null;
  }
};
