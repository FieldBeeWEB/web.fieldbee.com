import { ContentWrapper } from "@fieldbee/ui";

import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../config/page-paths";
import { getUserToken } from "../helpers/user-token";

export default function AuthedLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();

  React.useEffect(() => {
    const token = getUserToken();
    if (!token) {
      router.push(pagePaths.publicPages.login);
    }
  }, [router]);

  return <ContentWrapper>{children}</ContentWrapper>;
}
