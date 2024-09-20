import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../config/page-paths";
import { deleteUserToken } from "../helpers/user-token";

const Logout: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    deleteUserToken();
    router.push(pagePaths.publicPages.login);
  }, [router]);

  return <></>;
};

export default Logout;
