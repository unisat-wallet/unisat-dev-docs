import React, { useId, useState, type ReactNode } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

type SecurityScheme = {
  name: string;
  type: string;
  in?: string;
  header?: string;
  scheme?: string;
};

type ResponseExample = {
  status: string;
  description: string;
  mediaType?: string;
  name?: string;
  example?: string;
  generated?: boolean;
};

type Props = {
  method: string;
  path: string;
  testUrl: string;
  server?: string;
  securitySchemes?: SecurityScheme[];
  requestExample?: string;
  responses: ResponseExample[];
  children: ReactNode;
};

function formatRequest(
  method: string,
  path: string,
  server?: string,
  schemes: SecurityScheme[] = [],
): string {
  let requestPath = path;
  const headers: string[] = [];
  if (server) {
    try {
      const url = new URL(server);
      requestPath = url.pathname.replace(/\/$/, "") + path;
      if (url.host) headers.push(`Host: ${url.host}`);
    } catch {
      // Some specifications use a relative server path or a URL template.
      requestPath = server.replace(/\/$/, "") + path;
    }
  }
  for (const scheme of schemes) {
    if (scheme.type === "http" && scheme.scheme?.toLowerCase() === "bearer") {
      headers.push("Authorization: Bearer YOUR_API_KEY");
    } else if (scheme.type === "apiKey" && scheme.in === "header") {
      headers.push(`${scheme.header || scheme.name}: YOUR_API_KEY`);
    }
  }
  headers.push("Accept: */*");
  return [`${method} ${requestPath} HTTP/1.1`, ...headers].join("\n");
}

function exampleLanguage(mediaType?: string): string {
  if (mediaType?.includes("json")) return "json";
  if (mediaType?.includes("xml")) return "xml";
  return "text";
}

function ResponseExamples({ responses }: { responses: ResponseExample[] }) {
  const titleId = useId();
  const selectorId = useId();
  const defaultExample = responses.findIndex(
    ({ status, example }) => /^2(?:\d{2}|XX)$/i.test(status) && example !== undefined,
  );
  const firstExample = responses.findIndex(({ example }) => example !== undefined);
  const [selectedIndex, setSelectedIndex] = useState(
    defaultExample < 0 ? Math.max(firstExample, 0) : defaultExample,
  );
  const response = responses[selectedIndex] ?? responses[0];

  return (
    <section className={styles.panel} aria-labelledby={titleId}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle} id={titleId}>Response example</h2>
        {response && (
          <span className={styles.status} data-status={response.status[0]}>
            {response.status}
          </span>
        )}
      </div>
      {responses.length > 1 && (
        <div className={styles.responseControls}>
          <label className={styles.srOnly} htmlFor={selectorId}>
            Select a response example
          </label>
          <select
            className={styles.select}
            id={selectorId}
            value={selectedIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
          >
            {responses.map(({ status, name, description, mediaType }, index) => (
              <option key={index} value={index}>
                {[status, name || description, mediaType].filter(Boolean).join(" · ")}
              </option>
            ))}
          </select>
        </div>
      )}
      {response ? (
        <>
          <div className={styles.responseMeta}>
            {response.description && <p>{response.description}</p>}
            {(response.mediaType || response.generated) && (
              <div className={styles.responseLabels}>
                {response.mediaType && <span>{response.mediaType}</span>}
                {response.generated && <span>Generated from schema</span>}
              </div>
            )}
          </div>
          {response.example === undefined ? (
            <p className={styles.empty}>No response body example is documented.</p>
          ) : (
            <div className={styles.code}>
              <CodeBlock language={exampleLanguage(response.mediaType)}>
                {response.example}
              </CodeBlock>
            </div>
          )}
        </>
      ) : (
        <p className={styles.empty}>No responses are documented.</p>
      )}
    </section>
  );
}

function TestLink({ url, className }: { url: string; className?: string }) {
  return (
    <a
      className={[styles.testLink, className].filter(Boolean).join(" ")}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Test it <span aria-hidden="true">↗</span>
      <span className={styles.srOnly}> in Swagger UI (opens in a new tab)</span>
    </a>
  );
}

export default function ApiEndpointReference({
  method,
  path,
  testUrl,
  server,
  securitySchemes,
  requestExample,
  responses,
  children,
}: Props) {
  const requestTitleId = useId();
  const verb = method.toUpperCase();
  const endpointUrl = server ? server.replace(/\/$/, "") + path : path;

  return (
    <div className={styles.reference}>
      <div className={styles.layout}>
        <div className={styles.details}>
          <div className={styles.endpoint}>
            <span className={styles.method} data-method={verb}>{verb}</span>
            <code>{endpointUrl}</code>
          </div>
          <TestLink url={testUrl} className={styles.mobileTest} />
          {children}
        </div>
        <aside className={styles.examples} aria-label="Request and response examples">
          <section className={styles.panel} aria-labelledby={requestTitleId}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle} id={requestTitleId}>Request example</h2>
              <span className={styles.format}>HTTP</span>
            </div>
            <div className={styles.code}>
              <CodeBlock language="http">
                {requestExample ?? formatRequest(verb, path, server, securitySchemes)}
              </CodeBlock>
            </div>
            <div className={styles.actions}>
              <TestLink url={testUrl} />
            </div>
          </section>
          <ResponseExamples key={`${verb}:${endpointUrl}`} responses={responses} />
        </aside>
      </div>
    </div>
  );
}
