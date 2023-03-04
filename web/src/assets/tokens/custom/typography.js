const commonTypography = {
  fontFamily: "'SEQUEL100-66', sans-serif",
  fontStyle: 'normal',
};

const typography = {
  '.text-h1': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: '120%',
  },
  '.text-h2': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: '120%',
  },
  '.text-h3': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: '120%',
  },
  '.text-h4': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: '120%',
  },
  '.text-h5': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '120%',
  },
  '.text-h6': {
    ...commonTypography,
    fontWeight: 600,
    fontSize: '.875rem',
    lineHeight: '120%',
  },
  '.text-body-lg': {
    ...commonTypography,
    fontSize: '1rem',
    lineHeight: '150%',
    fontWeight: 400,
  },
  '.text-body-md': {
    ...commonTypography,
    fontSize: '0.875rem',
    lineHeight: '150%',
    fontWeight: 400,
  },
  '.text-body-sm': {
    ...commonTypography,
    fontSize: '.75rem',
    lineHeight: '150%',
    fontWeight: 400,
  },
  '.text-body-lg-heavy': {
    ...commonTypography,
    fontSize: '1rem',
    lineHeight: '150%',
    fontWeight: 600,
  },
  '.text-body-md-heavy': {
    ...commonTypography,
    fontSize: '0.875rem',
    lineHeight: '150%',
    fontWeight: 600,
  },
  '.text-body-sm-heavy': {
    ...commonTypography,
    fontSize: '.75rem',
    lineHeight: '150%',
    fontWeight: 600,
  },
  '.text-body-xs-heavy': {
    ...commonTypography,
    fontSize: '0.75rem',
    lineHeight: '0.75rem',
    fontWeight: 600,
  },
};

module.exports = {
  ...typography,
};
