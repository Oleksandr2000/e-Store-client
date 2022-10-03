import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={287}
    height={585}
    viewBox="0 0 287 585"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="287" height="350" />
    <rect x="0" y="380" rx="10" ry="10" width="287" height="45" />
    <rect x="0" y="450" rx="10" ry="10" width="90" height="30" />
    <rect x="0" y="519" rx="5" ry="5" width="120" height="30" />
    <rect x="110" y="450" rx="10" ry="10" width="90" height="30" />
  </ContentLoader>
);

export default MyLoader;
