import React from 'react';

interface LoaderProps {
  styles: any;
}

const Loader: React.FC<LoaderProps> = ({ styles }) => {
  return (
    <div className={`mt-5 ${styles}`}>
      <img src="/Main-spinner.svg" alt="loading..." />
    </div>
  );
};

export default Loader;
