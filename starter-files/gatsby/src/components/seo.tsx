import { graphql, PageProps, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet, HelmetProps } from "react-helmet";
import { SiteMetadata } from "../types/site-metadata";

export type SeoProps = {
  image?: any;
};

type SiteMetadataQuery = {
  site: { siteMetadata: SiteMetadata };
};

const SEO = (p: SeoProps & HelmetProps & Partial<PageProps>) => {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{p.title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      <link rel="alternet icon" href="/favicon.ico"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {p.location && <meta property="og:url" content={p.location.href} />}
      <meta property="og:image" content={p.image || "/logo.svg"} />
      <meta property="og:title" content={p.title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={site.siteMetadata.description}
        key="ogdesc"
      />
      {p.children}
    </Helmet>
  );
};

export default SEO;
