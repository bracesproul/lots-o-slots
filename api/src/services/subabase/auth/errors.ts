import { GraphQLError } from 'graphql';
import { registerEnumType } from 'type-graphql';

export enum HttpErrorCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

registerEnumType(HttpErrorCodes, { name: 'HttpErrorCodes' });

export const UserAlreadyExistsError = () => {
  throw new GraphQLError(
    'User already exists',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: HttpErrorCodes.Conflict }
  );
};

export const InvalidCredentialsError = () => {
  throw new GraphQLError(
    'Invalid username and/or password.',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: HttpErrorCodes.Unauthorized }
  );
};

export const AuthError = (message: string) => {
  throw new GraphQLError(
    message,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: HttpErrorCodes.BadRequest }
  );
};

export const UserNotFoundError = () => {
  throw new GraphQLError(
    'No user found.',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: HttpErrorCodes.Unauthorized }
  );
};

export const UpdateUserError = () => {
  throw new GraphQLError(
    'Error updating user.',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: HttpErrorCodes.BadRequest }
  );
};
