import { LoginPage } from "@/features";
import { PageType } from "@/types";
import { withAuthRequired } from "@/utils";
import { ReactElement } from "react";

export default function Login(): ReactElement {
  return <LoginPage />;
}

export const getServerSideProps = withAuthRequired(null, PageType.LOGIN);
