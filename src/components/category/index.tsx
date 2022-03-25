import React, { FC } from 'react';
import { Link, navigate } from 'gatsby';

import getEmoji from '@utils/emoji';
import { fmtURI } from '@utils/tools';

import './index.scss';

interface CategoryProps {
  data: any;
  go?: string;
}

const Category: FC<CategoryProps> = ({ data, go }) => {
  if (!(data && data?.name)) return null;
  return (
    <Link
      className="gg-category"
      to={go ? go : `/category/${fmtURI(data.name, true)}`}
      target={go ? '_blank' : '_self'}
    >
      {getEmoji(data.emoji)} {data.name}
    </Link>
  );
};

export default Category;
