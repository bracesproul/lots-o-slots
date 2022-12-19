import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const STORAGE_KEY = 'lS_lots_o_slots_auth';

type WithAuthRequiredValue = {
  authed: boolean;
};

const withAuthRequired: GetServerSideProps<WithAuthRequiredValue> = async (
  context: GetServerSidePropsContext
) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie ?? '');
  if (parsedCookies[STORAGE_KEY] === 'pizza') {
    return {
      props: {
        authed: true,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/admin/authorize',
        permanent: false,
      },
    };
  }
};

export default withAuthRequired;
