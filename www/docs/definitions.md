import vars from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


export function Config(props) {
  return vars[props.v];
}