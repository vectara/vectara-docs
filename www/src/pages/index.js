import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Powerful Semantic Search</>,
    description: (
      <>
        Our semantic search, based on the latest Neural IR research, returns
        results that keyword search often misses.

        <br></br>
        <br></br>

        Semantic search is not just about finding data, but about understanding 
        data and helping you answer questions about your data.
      </>
    ),
  },
  {
    title: <>Easy to Use</>,
    description: (
      <>
        Our intuitive cloud-based API makes it easy to index and query your
        textual data, making it easy to create generative AI advanced
        applications like{" "}
        <a href="https://asknews.demo.vectara.com/">our AskNews</a> demo
        quickly.
        <br></br>
        <br></br>

        🌟 <b></b>Dive into our <b>{" "} <a href="https://docs.vectara.com/docs/rest-api/vectara-rest-api">API Playground </a></b>
        to experiment with Vectara's REST APIs directly from your browser! 🌟
      </>
    ),
  },
  {
    title: <>Designed by Experts</>,
    description: (
      <>
        We are experts in language understanding and machine learning with over
        twenty-five years of industry experience.

        <br></br>
        <br></br>

        Our cutting-edge solutions are built on this extensive expertise 
        to deliver optimal performance and reliability.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
        </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
