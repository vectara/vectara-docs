import variables from '@site/static/variables.json'; // Renamed for clarity

const Config = ({ v }) => {
  return variables.vars[v] || `Unknown config: ${v}`; // Access nested vars
};

export default {
  Config
};