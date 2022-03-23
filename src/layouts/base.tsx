import React from 'react';
import clsx from 'clsx';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import Logo from '@comps/logo';
import Nav from '@src/components/nav';
import '@styles/layout.scss';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
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
          userLogo
        }
      }
    }
  `);

  const siteData = data.site.siteMetadata;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title || siteData.title}</title>
        <meta name="description" content={siteData.description} />
      </Helmet>
      <div className={clsx('gg-container', props.className)}>
        <header>
          {!siteData.userLogo ? (
            <Logo onClick={() => navigate('/')} color="var(--gg-logo)" />
          ) : (
            <img
              className="imglogo"
              src={require('../static/logo.png').default}
              onClick={() => navigate('/')}
              alt="logo"
            />
          )}
          <Nav siteMetadata={siteData} />
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
    </HelmetProvider>
  );
}
