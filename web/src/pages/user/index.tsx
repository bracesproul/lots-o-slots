import { ReactElement } from "react";
import { UserPage } from "@/features";
import { withAuthRequired } from "@/utils";

export default function User(): ReactElement {
  return <UserPage />;
}

export const getServerSideProps = withAuthRequired(null);
