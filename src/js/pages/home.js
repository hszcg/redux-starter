import React from 'react';

import { actions as homeActions, view as HomePage } from 'components/home/';

export default function Home() {
  return (
    <div id="page-wrapper">
      <HomePage />
    </div>
  );
}

Home.dataSources = [
  homeActions.fetchData
];
