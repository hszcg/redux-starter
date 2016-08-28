'use strict';

import React, { PropTypes } from 'react';

export default function {{pascalCase componentName}}(props){
  // TODO: change below to render your compnoent
  return <div onClick={props.init}>Hello</div>;
}

{{pascalCase componentName}}.propTypes = {
  // TODO: add supported prop here. Below is an example
  init: PropTypes.func
};


