import React, { FC } from 'react';
import { Link } from 'gatsby';

import getEmoji from '@utils/emoji';

import './index.scss';

interface CategoryProps {
  data: any;
}

const Category: FC<CategoryProps> = ({ data }) => {
  return (
    <Link className="category" to={`/category/${data.name}`}>
      {getEmoji(data.emoji)} {data.name}
    </Link>
  );
};

export default Category;
