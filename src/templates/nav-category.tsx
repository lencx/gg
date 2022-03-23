import React from 'react';
import { Icon } from '@iconify/react/dist/offline';
import iconCategory from '@iconify-icons/bxs/category';

import Layout from '@layouts/base';
import Category from '@comps/category';
import '@styles/nav-category.scss';

export default function BlogNavCategory(props: any) {
  const list = props.pageContext.categoryList;

  return (
    <Layout className="nav-category-page" title="Category">
      <div className="markdown-body">
        <div className="page-title">
          <Icon className="icon" icon={iconCategory} fontSize="24" />
          Category
        </div>
        <div className="list text-center">
          {list.map((item: any, idx: number) => {
            return <Category key={+idx} data={item} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
