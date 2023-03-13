import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components';
import { CookieStorage } from 'local-storage-fallback';
import { useRouter } from 'next/router';
import { StylePrefix } from '@/types/style-prefix';
import { useCheckAuthLazyQuery } from '@/generated/graphql';

export type AdminAuthorizePageProps = {
  className?: string;
  wrongPassword: boolean;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  /** Whether or not inputs are disabled */
  isDisabled?: boolean;
};

const PREFIX = StylePrefix.ADMIN_AUTHORIZE_PAGE;

function WrongPassword(): ReactElement {
  return (
    <div className={clsx([`${PREFIX}`])}>
      <h1 className={`${PREFIX}-wrong-pw-text`}>Incorrect password.</h1>
      <p className={`${PREFIX}-note`}>Reloading in 5 seconds.</p>
    </div>
  );
}

function AdminAuthorizePage(props: AdminAuthorizePageProps): ReactElement {
  const p = { ...props };

  const handleSubmit = () => {
    p.handleSubmit();
  };

  const disableInputs = p.isDisabled;

  return (
    <div className={'grid place-content-center mt-[35vh]'}>
      {p.wrongPassword ? (
        <WrongPassword />
      ) : (
        <>
          {!p.isDisabled ? (
            <div className={clsx([`${PREFIX}`, props.className])}>
              <form onSubmit={handleSubmit} className={'flex flex-col'}>
                <h1 className={`${PREFIX}-title`}>Enter Password</h1>
                <input
                  className={`${PREFIX}-input`}
                  placeholder="password"
                  type="text"
                  value={p.password}
                  onChange={(e) => p.setPassword(e.target.value)}
                />
                <Button
                  isDisabled={!p.password}
                  onPress={handleSubmit}
                  className={'rounded-full'}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </div>
          ) : (
            <div className={clsx([`${PREFIX}`, props.className])}>
              <h1 className={`${PREFIX}-title`}>Verifying, please wait.</h1>
              <p className={`${PREFIX}-note`}>
                If you are not redirected within a few seconds please try again
                or contact an admin.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminAuthorizePageContainer(): ReactElement {
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const router = useRouter();

  const [checkAuth, { data, loading, error }] = useCheckAuthLazyQuery();

  return (
    <AdminAuthorizePage
      password={password}
      setPassword={setPassword}
      wrongPassword={wrongPassword}
      isDisabled={loading || !!error}
      handleSubmit={async () => {
        const { data } = await checkAuth({
          variables: {
            password,
          },
        });
        if (data?.checkAdminPagePassword.success) {
          const cookieStorage = new CookieStorage();
          cookieStorage.setItem('lots_o_slots_auth', password);
          router.push('/admin');
        } else {
          setWrongPassword(true);
          setTimeout(() => {
            router.reload();
          }, 5000);
        }
      }}
    />
  );
}
