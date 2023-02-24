/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

export const BungieImage: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const {
    src,
    ...otherProps
  } = props;

  return (
    <img
      src={`https://www.bungie.net${src}`}
      loading="lazy"
      {...otherProps}
    />
  );
}