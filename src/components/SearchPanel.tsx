import React from 'react';
import { Form } from 'react-bootstrap';

const SearchPanel = () => {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="search-panel">
      <Form.Control name="search" placeholder="Search" value={value} />
    </div>
  );
};

export default SearchPanel;
