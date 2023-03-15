export type UserInfoFormData = {
  /** State variable for the username */
  username: string;
  /** State setter for controlling the username */
  setUsername: (username: string) => void;
  /** State variable for the password */
  password: string;
  /** State setter for controlling the password */
  setPassword: (password: string) => void;
  /** State variable for the email */
  email: string;
  /** State setter for controlling the email */
  setEmail: (email: string) => void;
  /** State variable for the users first name */
  firstName: string;
  /** State setter for controlling the users first name */
  setFirstName: (firstName: string) => void;
  /** State variable for the users last name */
  lastName: string;
  /** State setter for controlling the users last name */
  setLastName: (lastName: string) => void;
};

export type InitialFormValues = Pick<
  UserInfoFormData,
  'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;
