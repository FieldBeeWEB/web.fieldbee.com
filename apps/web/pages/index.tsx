import { pagePaths } from "../config/page-paths";
import AuthedLayout from "../screens/authed-layout";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: pagePaths.authPages.dashboard,
      permanent: false,
    },
  };
}

export default function Web() {
  return <AuthedLayout />;
}
