import PasswordValidator from "password-validator";

export const validatePassword = (password: string) => {
  const validatePassword = new PasswordValidator();

  validatePassword.is().min(6)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces();

  return !!validatePassword.validate(password);
};
