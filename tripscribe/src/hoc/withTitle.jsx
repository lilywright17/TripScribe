import React from 'react';
import { Helmet } from 'react-helmet';

export const HelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <title>Tripscribe - {title}</title>
    </Helmet>
  );
};

