import isServer from './isServer';

export const API_URL = `${
  isServer() ? process.env.APOLLO_SERVER_URI ?? '' : ''
}/graphql`;
