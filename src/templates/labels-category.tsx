import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'gatsby';
import includes from 'lodash/includes';
import clsx from 'clsx';

import IssuesNum from '@comps/issues_num';
import useRgd from '@hooks/useRgd';
import useIssuesList from '@hooks/useIssuesList';
import Author from '@comps/author';
import Layout from '@layouts/base';
import Label from '@comps/label';
import { fmtLabelsCategory } from '@utils/tools';
import '@styles/labels-category.scss';

export default function BlogLabelsCategory(props: any) {
  const colorMap = props.pageContext.colorMap;
  const { website } = useRgd();
  const issuesList = useIssuesList();
  const [activeTab, setActiveTab] = useState('');
  const [activeLevel, setActiveLevel] = useState('list');
  const labelsMap: any = useMemo(
    () =>
      fmtLabelsCategory(
        issuesList,
        website?.label_category,
        website?.label_level
      ),
    []
  );

  const handleTab = (active: string) => {
    setActiveTab(active);
    setActiveLevel('list');
  };
  const handleLevel = (active: string) => {
    setActiveLevel(active);
  };

  useEffect(() => {
    setActiveTab(Object.keys(labelsMap)?.[0]);
  }, []);

  const listData = labelsMap?.[activeTab]?.list;

  return (
    <Layout className="labels-category-page" title="Labels">
      <div className="markdown-body issues-list">
        <div className="gg-label-category-head">
          <div className="category-group">
            {Object.keys(labelsMap).map((item, idx) => {
              return (
                <div
                  key={`${item}_${idx}`}
                  className={clsx('label-category', {
                    active: item === activeTab,
                  })}
                  style={{ background: `#${colorMap[item]}` }}
                  onClick={() => handleTab(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="level-group">
            {labelsMap?.[activeTab] &&
              labelsMap?.[activeTab].level
                ?.sort()
                ?.map((item: any, idx: number) => {
                  if (item === 'list') return null;
                  return (
                    <div
                      key={`${item}_${idx}`}
                      className={clsx('label-level', `level${++idx}`, {
                        active: activeLevel === item,
                      })}
                      style={{ background: `#${colorMap[item]}` }}
                      onClick={() => handleLevel(item)}
                    >
                      {item}
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="gg-category-content issues-list">
          <div>
            {listData
              ?.filter((i: any) => {
                if (activeLevel === 'list') return true;
                return includes(i.level, activeLevel.toLocaleUpperCase());
              })
              ?.map((node: any) => {
                if (!node) return null;
                return (
                  <div key={node.number} className="item">
                    <Author
                      author={node.author}
                      date={node.updatedAt}
                      extra={<IssuesNum number={node.number} />}
                    />
                    <div className="labels-list">
                      {node.labels.map((label: any) => {
                        return <Label data={label} hasLevel />;
                      })}
                    </div>
                    <div className="post-info">
                      <Link className="title" to={`/issues/${node.number}`}>
                        {node.title}
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
