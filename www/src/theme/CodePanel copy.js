import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './CodePanel.module.css';

export default function CodePanel({ snippets, title }) {
  return (
    <div className={styles.codePanel}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <Tabs
        defaultValue={snippets[0].language}
        values={snippets.map((snippet) => ({
          label: snippet.language,
          value: snippet.language,
        }))}
      >
        {snippets.map((snippet, index) => (
          <TabItem value={snippet.language} key={index}>
            <CodeBlock language={snippet.language} showLineNumbers>
              {snippet.code}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}