import React, { FC } from 'react';
import { Link } from 'gatsby';

import { fmtURI } from '@utils/tools';
import usePrefix from '@hooks/usePrefix';

import './index.scss';

interface LabelProps {
  data: any;
}

const Label: FC<LabelProps> = ({ data }) => {
  const prefix = usePrefix();
  return (
    <Link
      key={data.name}
      className="gg-label"
      style={{ borderColor: `#${data.color}` }}
      to={`${prefix}labels/${fmtURI(data.name)}`}
    >
      <b style={{ background: `#${data.color}` }}>#</b>
      <em>{data.name}</em>
    </Link>
  );
};

export default Label;
