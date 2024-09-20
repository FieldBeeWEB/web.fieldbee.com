import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface ProfileResponse {
  additionalInfo: string;
  birthday: string;
  countryCode: string;
  email: string;
  field_guidance_flag: boolean;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  localeLang: string;
  login: string;
  organization: string;
  phoneNumber: string;
  phoneNumberValidated: boolean;
  play_flag: boolean;
  uri: string;
  userTimeZone: string;
  photoPath: string;
}

export const useGetProfile = () =>
  useQuery(queryKeys.getProfile, () =>
    axiosInstance<ProfileResponse>({
      method: "GET",
      url: "/RESTService/user/profile",
    }).then((res) => res.data)
  );
