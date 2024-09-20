import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type AddOrganizationFieldCategoryInput = {
  name: string;
  code: string;
  uri: string;
};

export const useAddOrganizationFieldCategory = () =>
  useMutation<null, ApiErrorResponse, AddOrganizationFieldCategoryInput>(
    (input) => {
      const params = [
        {
          status: "new",
          document: { ...input, categoryType: "ORG_FIELD" },
        },
      ];
      return axiosInstance({
        method: "POST",
        url: "/RESTService/document/apply-changes",
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      }).then((res) => res.data);
    }
  );
