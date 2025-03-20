import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";

export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1>
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page"
                >
                  Page missing
                </Translate>
              </h1>

              <p>
                <Translate id="theme.NotFound.p1">
                  Sorry, we accidentally broke this link. Please try searching
                  for your topic with the search box above.
                </Translate>
              </p>

              <p>
                <Translate
                  id="theme.NotFound.p2"
                  description="The first paragraph of the 404 page"
                  values={{
                    link: (
                      <a href="https://github.com/vectara/vectara-docs/issues/new?assignees=&labels=bug&projects=&template=bug.yml">
                        let us know
                      </a>
                    ),
                  }}
                >
                  {
                    "If you can't find what you're looking for, please {link} so we can fix it. Thanks!"
                  }
                </Translate>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
