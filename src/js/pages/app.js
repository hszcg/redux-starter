import React from 'react';

import { actions as basicActions, view as Basic } from 'components/basic/';

export default function App({ children }) {
  return (
    <div>
      <Basic />
        {children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object
};

App.dataSources = [
  basicActions.fetchData
];
