import React, { FC } from 'react';
import { Link } from 'gatsby';

import './index.scss';

interface LabelProps {
  data: any;
}

const Label: FC<LabelProps> = ({ data }) => {
  return (
    <Link
      key={data.name}
      className="label"
      style={{ borderColor: `#${data.color}` }}
      to={`/labels/${data.name}`}
    >
      <b style={{ background: `#${data.color}` }}>#</b>
      <em>{data.name}</em>
    </Link>
  );
};

export default Label;
