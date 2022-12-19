import isServer from './isServer';

export const API_URL = `${
  isServer() ? process.env.API_BASE_URL ?? '' : ''
}/graphql`;
