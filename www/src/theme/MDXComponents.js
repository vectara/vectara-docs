import DefaultMDXComponents from '@theme-original/MDXComponents';
import variables from '@site/static/variables.json';

const Config = ({ v }) => {
  return variables.vars[v] || `Unknown config: ${v}`;
};

export default {
  ...DefaultMDXComponents, // Preserve default components, including Admonition
  Config // Add your custom component
};