import DefaultMDXComponents from '@theme-original/MDXComponents';
import variables from '@site/static/variables.json';
import { ApiKeyTypeBadge } from '@site/src/components/ApiKeyBadge';

const Config = ({ v }) => {
  return variables.vars[v] || `Unknown config: ${v}`;
};

export default {
  ...DefaultMDXComponents, // Preserve default components, including Admonition
  Config, // Add your custom component
  ApiKeyTypeBadge // Add the API key badge component
};