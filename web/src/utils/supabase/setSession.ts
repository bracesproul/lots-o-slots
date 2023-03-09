import { User, useSupabaseClient } from "@supabase/auth-helpers-react";

const setSession = async (input: { refreshToken: string; accessToken: string; }): Promise<User | null> => {
  const { refreshToken, accessToken } = input;
  const supabaseClient = useSupabaseClient();

  const response = await supabaseClient.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const { data, error } = response || {};

  if (error) {
    console.error(error);
    return null;
  }

  if (!data?.session?.user) {
    console.error('No user found');
    return null;
  }

  return data.session.user;
}

export default setSession;
