import React from 'react';
import { Icon } from '@iconify/react/dist/offline';
import iconTags from '@iconify-icons/mdi/tag-multiple';

import Layout from '@layouts/base';
import Label from '@comps/label';
import '@styles/nav-labels.scss';

export default function BlogNavCategory(props: any) {
  const list = props.pageContext.labelsList;

  return (
    <Layout className="nav-labels-page" title="Labels">
      <div className="markdown-body">
        <div className="page-title">
          <Icon className="icon" icon={iconTags} fontSize="24" />
          Labels
        </div>
        <div className="list text-center">
          {list.map((item: any, idx: number) => {
            return <Label key={+idx} data={item} />;
          })}
          {list.length === 0 && <span className="gg-empty">No Data</span>}
        </div>
      </div>
    </Layout>
  );
}
