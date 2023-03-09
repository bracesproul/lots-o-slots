import { User, useSupabaseClient } from "@supabase/auth-helpers-react";

const getUser = async (): Promise<User | null> => {
  const supabaseClient = useSupabaseClient();

  const response = await supabaseClient.auth.getUser()

  const { data, error } = response || {};

  if (error) {
    console.error(error);
    return null;
  }

  if (!data?.user) {
    console.error('No user found');
    return null;
  }

  return data.user;
}

export default getUser;
