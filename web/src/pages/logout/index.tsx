import { ReactElement, useEffect } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";

export default function Logout(): ReactElement {

  const signOut = async () => {
    const supabase = useSupabaseClient()
    await supabase.auth.signOut()
    useRouter().push('/login')
  }
  
  useEffect(() => {
    signOut().catch((e) => console.error(e))
  }, [])
  
  return <div></div>;
}
