import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Icon } from '@iconify/react/dist/offline';
import iconAnswer from '@iconify-icons/mdi/question-answer';
import iconQues from '@iconify-icons/mdi/comment-question';
import iconUpvote from '@iconify-icons/bxs/upvote';

import Layout from '@layouts/base';
import Author from '@comps/author';
import IssuesNum from '@comps/issues_num';
import Category from '@comps/category';
import Label from '@comps/label';
import PrevNext from '@comps/prev_next';
import '@styles/issues.scss';

export default function BlogIssues(props: any) {
  const [isHide, setHide] = useState(true);
  const data = props?.data?.issuesJson || {};
  const labels = data.labels?.edges;
  const comments = data.comments?.edges;
  const hasComments = comments?.length > 0;
  const isa = data?.category?.isAnswerable;
  const author = data?.author || {};
  const pageCxt = props.pageContext;

  useEffect(() => {
    setHide(data.category?.isAnswerable);
  }, []);

  return (
    <Layout className="issues-page" title={`${data.title} | Issues`}>
      <div className="markdown-body">
        <h1>
          <span>
            <IssuesNum number={data.number} />
            <span>{data.title}</span>
          </span>
        </h1>
        <div className="widget">
          <Category data={data?.category} />
          {labels &&
            labels.map(({ node }: any) => {
              return <Label key={node.name} data={node} />;
            })}
        </div>
        <div>
          <Author author={author} date={data?.updatedAt} />
          <div className="ques-content">
            {isa && (
              <div>
                <span className="icon-action quesicon" title="Question">
                  <Icon icon={iconQues} fontSize={30} />
                </span>
                <span className="vote">
                  <Icon icon={iconUpvote} />
                  <b>{data.upvoteCount}</b>
                </span>
              </div>
            )}
            <div
              className="quescontent"
              dangerouslySetInnerHTML={{ __html: data.bodyHTML }}
            />
          </div>
        </div>
        <PrevNext previous={pageCxt.previous} next={pageCxt.next} />
        <div className="answer-content">
          {hasComments && isa && (
            <div
              className="icon-action answericon"
              title="Answer"
              onClick={() => setHide(!isHide)}
            >
              <Icon icon={iconAnswer} fontSize={30} />
            </div>
          )}
          <div className="comments">
            {hasComments &&
              !isHide &&
              comments?.[0]?.node?.author?.login &&
              comments.map(({ node }: any) => {
                const _replies = node?.replies?.edges;
                return (
                  <div className="comments-item" key={node.id}>
                    <Author author={node.author} />
                    <div
                      className="comments-item-content"
                      dangerouslySetInnerHTML={{ __html: node.bodyHTML }}
                    />
                    {_replies?.map(({ node: node2 }: any) => {
                      return (
                        <div className="comments-item" key={node2.id}>
                          <Author author={node2.author} />
                          <div
                            className="comments-item-content"
                            dangerouslySetInnerHTML={{ __html: node2.bodyHTML }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query GGIssuesQuery($number: Int!) {
    issuesJson(number: { eq: $number }) {
      id
      title
      number
      bodyHTML
      updatedAt
      upvoteCount
      author {
        login
        avatarUrl
        url
      }
      category {
        isAnswerable
        name
        emoji
      }
      labels {
        edges {
          node {
            name
            color
          }
        }
      }
      comments {
        edges {
          node {
            id
            bodyHTML
            author {
              login
              avatarUrl
              url
            }
            replies {
              edges {
                node {
                  id
                  bodyHTML
                  author {
                    login
                    avatarUrl
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
