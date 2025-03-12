import {vars} from '@site/static/variables.json';

export function Config(props) {
  return vars[props.v];
}