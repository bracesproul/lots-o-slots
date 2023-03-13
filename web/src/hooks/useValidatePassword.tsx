import { useState, useRef, useEffect } from 'react';
import PasswordValidator from 'password-validator';
import { SignUpError } from '@/types';

type UseValidatePasswordOptions = {
  password: string;
};

type UseValidatePasswordAction = {
  /** Setter function for setting when the focus state of the password input has exited. */
  setFocusExit: (e: boolean) => void;
};

type UseValidatePasswordState = {
  /** Invalid message */
  errors?: SignUpError[];
  /** The password */
  password: string;
  /** Message to display when a password is invalid */
  invalidPasswordMessage?: string;
};

type UseValidatePasswordValue = UseValidatePasswordState &
  UseValidatePasswordAction;

const validatePassword = (password: string) => {
  const validatePassword = new PasswordValidator();

  validatePassword
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();

  return !!validatePassword.validate(password);
};

const INVALID_PASSWORD_MESSAGE =
  'Invalid Password, passwords must include two numbers, one uppercase and lowercase letter and no spaces.';

const useValidatePassword = (
  props: UseValidatePasswordOptions
): UseValidatePasswordValue => {
  const { password } = props;
  const hasPasswordFocusExited = useRef(false);
  const [focusExit, setFocusExit] = useState(false);
  let errors: SignUpError[] = [];
  const isPasswordValid = validatePassword(password);

  const invalidPasswordMessage = () => {
    if (!focusExit) {
      return undefined;
    }
    if (!isPasswordValid) {
      return INVALID_PASSWORD_MESSAGE;
    }
    return undefined;
  };

  if (focusExit && !isPasswordValid && password !== '') {
    hasPasswordFocusExited.current = true;
    if (!errors?.includes(SignUpError.INVALID_PASSWORD)) {
      errors = [...(errors ? errors : []), SignUpError.INVALID_PASSWORD];
    }
  }

  if (hasPasswordFocusExited.current && !isPasswordValid && password !== '') {
    if (!errors?.includes(SignUpError.INVALID_PASSWORD)) {
      errors = [...(errors ? errors : []), SignUpError.INVALID_PASSWORD];
    }
  } else if (password === '' || isPasswordValid) {
    errors = errors?.filter((e) => e !== SignUpError.INVALID_PASSWORD);
  }

  return {
    errors,
    password,
    setFocusExit,
    invalidPasswordMessage: invalidPasswordMessage(),
  };
};

export default useValidatePassword;
