import React from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import useRgd from '@hooks/useRgd';
import useSite from '@hooks/useSite';
import useRepoLink from '@hooks/useRepoLink';
import Logo from '@comps/logo';
import Nav from '@comps/nav';
import BackTop from '@comps/backtop';
import { go } from '@utils/tools';
import '@styles/layout.scss';

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export default function Layout(props: LayoutProps) {
  const data = useRgd();
  const siteData = useSite();
  const { dataRepo, repoTxt } = useRepoLink();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title || data?.title || data?.website?.title}</title>
        <meta
          name="description"
          content={data?.description || data?.website?.description}
        />
      </Helmet>
      <div className={clsx('gg-container', props.className)}>
        <header>
          {!siteData?.userLogo ? (
            <Logo onClick={() => navigate(`/`)} color="var(--gg-logo)" />
          ) : (
            <img
              className="imglogo"
              src={require('../static/logo.png').default}
              onClick={() => navigate(`/`)}
              alt="logo"
            />
          )}
          <Nav />
        </header>
        <main>
          <div className="content">{props.children}</div>
        </main>
        <footer>
          <div className="license">
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
              target="_blank"
            >
              <img
                style={{ width: 60, height: 21 }}
                src={require('@icons/license.svg').default}
                alt="License"
              />
            </a>
          </div>
          <div className="copyright">
            <span>
              Copyright ©{' '}
              {data?.website?.built_date || new Date().getFullYear()}
              -present
            </span>
            <a className="owner" href={dataRepo} target="_blank">
              {repoTxt}
            </a>
            {'.'}
          </div>
          <span className="powered">
            Powered by
            <a
              className="owner"
              title="GG (Gatsby + GitHub) - A gatsby website builder based on github discussions"
              href="https://github.com/lencx/gg"
              target="_blank"
            >
              gg
            </a>
          </span>
        </footer>
      </div>
      <BackTop />
    </HelmetProvider>
  );
}
