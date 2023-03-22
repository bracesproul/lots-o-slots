import { Dialog, Text } from '@/components';
import { ReactElement, useEffect, useState } from 'react';
import { handleSetUserCookie, handleGetUserCookie } from '@/utils';
import { StylePrefix } from '@/types/style-prefix';
import { useGetGeneratedAccountQuery } from '@/generated/graphql';

type OptionalFieldsType = {
  cashtag: string;
  zelleEmail: string;
  paypalEmail: string;
};

export type GenerateAccountDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
  password: string;
  errorMessage: string | null;
  hasLogin: boolean;
};

const PREFIX = StylePrefix.GENERATE_ACCOUNT;

function GenerateAccountDialog(
  props: GenerateAccountDialogProps
): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Generate Account"
      buttonTitle="Close"
    >
      <div className={`${PREFIX}-content`}>
        {p.errorMessage ? (
          <>
            <Text className={`${PREFIX}-error`}>{p.errorMessage}</Text>
          </>
        ) : p.hasLogin ? (
          <Text className="text-center text-white">
            Can not request more than one login
          </Text>
        ) : (
          <>
            <div className={`${PREFIX}-row`}>
              <Text isHeavy>Username:</Text>
              <Text className="text-gray-100">{p.username}</Text>
            </div>
            <div className={`${PREFIX}-row`}>
              <Text isHeavy>Password:</Text>
              <Text className="text-gray-100">{p.password}</Text>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default function GenerateAccountDialogContainer(
  props: Pick<GenerateAccountDialogProps, 'open' | 'setOpen'>
): ReactElement {
  const cookie = handleGetUserCookie('generatedAccount');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasLogin, setHasLogin] = useState(false);
  const { data, error } = useGetGeneratedAccountQuery({
    skip: cookie === 'true' || props.open === false,
  });

  const { username: availableUsername, password: availablePassword } =
    data?.getGeneratedAccount || {
      username: '',
      password: '',
    };

  useEffect(() => {
    if (
      availableUsername &&
      availableUsername !== '' &&
      availablePassword &&
      availablePassword !== '' &&
      props.open
    ) {
      setUsername(availableUsername);
      setPassword(availablePassword);
      handleSetUserCookie('generatedAccount', 'true');
    }
    if (cookie === 'true') {
      setHasLogin(true);
    }
  }, [props.open, availableUsername, availablePassword, cookie]);

  return (
    <GenerateAccountDialog
      {...props}
      username={username}
      password={password}
      hasLogin={hasLogin}
      errorMessage={
        error ? 'Something went wrong. Please try again later.' : null
      }
    />
  );
}
