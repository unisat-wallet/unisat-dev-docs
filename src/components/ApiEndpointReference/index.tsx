import React, { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { usePrismTheme } from "@docusaurus/theme-common";
import { Highlight } from "prism-react-renderer";
import IconCopy from "@theme/Icon/Copy";
import IconSuccess from "@theme/Icon/Success";
import ApiFieldTable, { type FieldRow } from "./ApiFieldTable";
import styles from "./styles.module.css";

type ResponseExample = {
  name?: string;
  example: string;
  generated?: boolean;
};

type EndpointPathProps = {
  method: string;
  path: string;
  testUrl: string;
  server?: string;
};

type ResponseBodyProps = {
  status: string;
  mediaType: string;
  rows: FieldRow[];
  examples: ResponseExample[];
};

const responseViews = [
  { id: "fields", label: "Fields" },
  { id: "example", label: "Response example" },
] as const;

type ResponseView = (typeof responseViews)[number]["id"];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [feedback, setFeedback] = useState("");
  const resetTimer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function copy() {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setFeedback("Copied to clipboard");
    } catch {
      setFeedback("Could not copy to clipboard");
    }
    resetTimer.current = window.setTimeout(() => setFeedback(""), 2000);
  }

  return (
    <span className={styles.copyControl}>
      <button className={styles.copyButton} type="button" onClick={copy}>
        {feedback === "Copied to clipboard" ? <IconSuccess aria-hidden="true" /> : <IconCopy aria-hidden="true" />}
        {label}
      </button>
      <span className={styles.srOnly} role="status">{feedback}</span>
    </span>
  );
}

function ExampleCode({ code, language }: { code: string; language: string }) {
  const theme = usePrismTheme();
  return (
    <Highlight code={code} language={language} theme={theme}>
      {({ style, tokens, getTokenProps }) => (
        <pre className={styles.code} style={style}>
          <code>
            {tokens.map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && "\n"}
                {line.map((token, tokenIndex) => <span key={tokenIndex} {...getTokenProps({ token })} />)}
              </React.Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

function exampleLanguage(mediaType: string) {
  const normalized = mediaType.toLowerCase();
  if (normalized.includes("json")) return "json";
  if (normalized.includes("xml")) return "xml";
  return "text";
}

function ResponseExamplePanel({ mediaType, examples }: Pick<ResponseBodyProps, "mediaType" | "examples">) {
  const selectorId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sample = examples[selectedIndex] ?? examples[0];
  const language = exampleLanguage(mediaType);
  const format = language === "text" ? "Text" : language.toUpperCase();

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelContext}>
          <span className={styles.format}>{format}</span>
          {examples.length > 1 ? (
            <>
              <label className={styles.srOnly} htmlFor={selectorId}>Select a response example</label>
              <select
                className={styles.select}
                id={selectorId}
                value={selectedIndex}
                onChange={(event) => setSelectedIndex(Number(event.target.value))}
              >
                {examples.map(({ name }, index) => (
                  <option key={index} value={index}>{name || `Example ${index + 1}`}</option>
                ))}
              </select>
            </>
          ) : sample.name && <span className={styles.exampleSource}>{sample.name}</span>}
          {sample.generated && <span className={styles.exampleSource}>Generated from schema</span>}
        </div>
        <CopyButton key={selectedIndex} text={sample.example} label={language === "text" ? "Copy text" : `Copy ${format}`} />
      </div>
      <ExampleCode code={sample.example} language={language} />
    </div>
  );
}

export function ApiResponseBody({ status, mediaType, rows, examples }: ResponseBodyProps) {
  const id = useId();
  const [view, setView] = useState<ResponseView>("fields");
  const tabRefs = useRef<Partial<Record<ResponseView, HTMLButtonElement | null>>>({});

  const fields = rows.length > 0 && <ApiFieldTable rows={rows} caption={`${status} response fields for ${mediaType}`} />;
  const example = examples.length > 0 && <ResponseExamplePanel mediaType={mediaType} examples={examples} />;
  if (!fields || !example) return fields || example || null;

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, current: ResponseView) {
    let next: ResponseView;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        next = current === "fields" ? "example" : "fields";
        break;
      case "Home":
        next = "fields";
        break;
      case "End":
        next = "example";
        break;
      default:
        return;
    }
    event.preventDefault();
    setView(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div className={styles.responseTabs} role="tablist" aria-label={`${status} ${mediaType} response view`}>
        {responseViews.map(({ id: tab, label }) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${id}-${tab}-tab`}
            aria-selected={view === tab}
            aria-controls={`${id}-${tab}-panel`}
            tabIndex={view === tab ? 0 : -1}
            ref={(button) => { tabRefs.current[tab] = button; }}
            onClick={() => setView(tab)}
            onKeyDown={(event) => moveTab(event, tab)}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-fields-panel`} aria-labelledby={`${id}-fields-tab`} hidden={view !== "fields"}>
        {fields}
      </div>
      <div role="tabpanel" id={`${id}-example-panel`} aria-labelledby={`${id}-example-tab`} hidden={view !== "example"}>
        {example}
      </div>
    </div>
  );
}

function TestLink({ url }: { url: string }) {
  return (
    <a
      className={styles.testLink}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Test it <span aria-hidden="true">↗</span>
      <span className={styles.srOnly}> in Swagger UI (opens in a new tab)</span>
    </a>
  );
}

export function ApiEndpointPath({ method, path, testUrl, server }: EndpointPathProps) {
  const verb = method.toUpperCase();
  const endpointUrl = server ? server.replace(/\/$/, "") + path : path;

  return (
    <div className={styles.endpoint}>
      <span className={styles.method} data-method={verb}>{verb}</span>
      <code title={endpointUrl}>{path}</code>
      <div className={styles.endpointActions}>
        <CopyButton key={endpointUrl} text={endpointUrl} label="Copy URL" />
        <TestLink url={testUrl} />
      </div>
    </div>
  );
}

export default function ApiEndpointReference({ children }: { children: ReactNode }) {
  return (
    <div className={`api-endpoint-reference ${styles.reference}`}>
      {children}
    </div>
  );
}
