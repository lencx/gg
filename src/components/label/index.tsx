import React, { FC } from 'react';
import { Link } from 'gatsby';

import { fmtURI, getLevel } from '@utils/tools';
import useRgd from '@hooks/useRgd';

import './index.scss';

interface LabelProps {
  data: any;
  hasLevel?: boolean;
}

const Label: FC<LabelProps> = ({ data, hasLevel }) => {
  const rgdData = useRgd();

  return (
    <Link
      key={data.name}
      className="gg-label"
      style={{ borderColor: `#${data.color}` }}
      to={`/labels/${fmtURI(data.name)}`}
    >
      <b style={{ background: `#${data.color}` }}>
        #
        {hasLevel && (
          <span>
            {' '}
            {getLevel(data.description, rgdData?.website?.label_level)}
          </span>
        )}
      </b>
      <em>{data.name}</em>
    </Link>
  );
};

Label.defaultProps = {
  hasLevel: false,
};

export default Label;
