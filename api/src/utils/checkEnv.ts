export const isDevEnv = process.env.NODE_ENV === 'development';
export const isProdEnv = process.env.NODE_ENV === 'production';
export const isStagingEnv = process.env.NODE_ENV === 'staging';
export const isTestEnv = process.env.NODE_ENV === 'test';
export const isNotProdOrStagingEnv = !isProdEnv && !isStagingEnv;
