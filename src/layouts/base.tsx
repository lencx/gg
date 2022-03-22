import React from 'react';
import clsx from 'clsx';
import { navigate, useStaticQuery, graphql } from 'gatsby';

import Logo from '@comps/logo';
import Nav from '@src/components/nav';
import '@styles/layout.scss';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          rss
          repo
          title
          owner
          description
        }
      }
    }
  `);

  return (
    <div className={clsx('dev-container', props.className)}>
      <header>
        <Logo onClick={() => navigate('/')} color="var(--dev-logo)" />
        <Nav siteMetadata={data.site.siteMetadata} />
      </header>
      <main>
        <div className="content">{props.children}</div>
      </main>
      <footer>
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img
            style={{ width: 60, height: 21 }}
            src={require('@icons/license.svg').default}
            alt="License"
          />
        </a>{' '}
        Copyright © 2022-present {data.site.siteMetadata.owner}
      </footer>
    </div>
  );
}
