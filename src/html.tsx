import React from 'react';

export interface HTMLProps {
  body: string;
  htmlAttributes?: React.HTMLAttributes<HTMLElement>;
  bodyAttributes?: React.HTMLAttributes<HTMLElement>;
  headComponents?: React.ReactNode;
  preBodyComponents?: Array<React.ReactNode>;
  postBodyComponents?: Array<React.ReactNode>;
}

export default function HTML(props: HTMLProps) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        {props.headComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  window.__onThemeChange = function() {};
  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.querySelector('html').className = newTheme;
    window.__onThemeChange(newTheme);
  }
  var preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) { }
  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  }
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})()`,
          }}
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
