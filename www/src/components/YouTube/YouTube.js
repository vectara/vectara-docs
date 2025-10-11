import React from 'react';

const YouTube = ({ youTubeId }) => (
  <iframe
    width="800"
    height="450"
    src={`https://www.youtube.com/embed/${youTubeId}`}
    frameBorder="0"
    allowFullScreen
  />
);

export default YouTube;