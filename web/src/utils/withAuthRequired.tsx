import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const STORAGE_KEY = 'lots_o_slots_auth';

type WithAuthRequiredValue = {
  authed: boolean;
};

const withAuthRequired: GetServerSideProps<WithAuthRequiredValue> = async (
  context: GetServerSidePropsContext
) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie ?? '');
  console.log('parsedCookies', parsedCookies);
  if (parsedCookies[STORAGE_KEY] === 'pizza') {
    console.log('authed!');
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
