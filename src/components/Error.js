import React from 'react';

export default ({ error }) => (
  <div className="errormessage">{error.toString()}</div>
);
