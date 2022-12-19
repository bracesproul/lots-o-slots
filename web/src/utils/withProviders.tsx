import React from 'react';
import reduceRight from 'lodash/reduceRight';

type ProviderWithoutPropsType = React.ComponentType<any>;

type ProviderWithPropsType = [
  ProviderWithoutPropsType,
  Record<string, unknown>
];

export type ProviderType = ProviderWithoutPropsType | ProviderWithPropsType;

const isProviderWithProps = (
  provider: ProviderType
): provider is ProviderWithPropsType => Array.isArray(provider);

export const withProviders = (
  children: React.ReactNode,
  providers: ProviderType[]
): JSX.Element =>
  reduceRight<ProviderType, JSX.Element>(
    providers,
    (children, provider) => {
      if (isProviderWithProps(provider)) {
        const ProviderWithProps = provider[0];
        const providerProps = provider[1];
        return (
          <ProviderWithProps {...providerProps}>{children}</ProviderWithProps>
        );
      } else {
        const ProviderWithoutProps = provider;
        return <ProviderWithoutProps>{children}</ProviderWithoutProps>;
      }
    },
    <>{children}</>
  );
