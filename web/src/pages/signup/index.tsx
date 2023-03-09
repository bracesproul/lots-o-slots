import { SignUpPage } from "@/features";
import { PageType } from "@/types";
import { withAuthRequired } from "@/utils";
import { ReactElement } from "react";

export default function SignUp(): ReactElement {
  return <SignUpPage />;
}

export const getServerSideProps = withAuthRequired(null, PageType.SIGNUP);
