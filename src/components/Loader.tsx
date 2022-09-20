import React from 'react';

interface LoaderProps {
  styles: any;
}

const Loader: React.FC<LoaderProps> = ({ styles }) => {
  return (
    <div className={styles}>
      <img src="/Main-spinner.svg" alt="loading..." />
    </div>
  );
};

export default Loader;
