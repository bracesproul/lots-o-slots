import { ReactElement } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useLogoutMutation } from '@/generated/graphql';
import { PageType } from '@/types';
import { withLogout } from '@/utils/withAuthRequired';

export default function Logout(): ReactElement {
  return <div></div>;
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const supabase = createServerSupabaseClient(context);
//   const { error } = await supabase.auth.signOut();
//   if (error) {
//     console.error('Error logging out:', error.message);
//   }
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   };
// };
export const getServerSideProps = withLogout(null, PageType.LOGOUT);
