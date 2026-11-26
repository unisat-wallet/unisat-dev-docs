import React, { useState, type CSSProperties } from "react";
import styles from "./fields.module.css";

export type FieldRow = {
  field: string;
  name?: string;
  parentIndex?: number | null;
  type: string;
  description?: string;
  required?: boolean;
  details?: { label: string; value: string }[];
};

type Props = {
  rows: FieldRow[];
  fieldLabel?: string;
  caption: string;
};

type DetailProps = Pick<FieldRow, "description" | "details">;

function FieldDetails({ description, details, hideLabels = false }: DetailProps & { hideLabels?: boolean }) {
  return (
    <>
      {description && <div className={styles.description}>{description}</div>}
      {!!details?.length && (
        <dl className={styles.details}>
          {details.map(({ label, value }, index) => (
            <div key={`${label}:${index}`}>
              <dt className={hideLabels ? styles.visuallyHidden : undefined}>{label}:</dt>
              <dd><code>{value}</code></dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

function ResponseDetailCells({ description, details }: DetailProps) {
  const examples = details?.filter(({ label }) => label === "Example");
  const constraints = details?.filter(({ label }) => label !== "Example");

  return (
    <>
      <td className={styles.exampleCell}><FieldDetails details={examples} hideLabels /></td>
      <td><FieldDetails description={description} details={constraints} /></td>
    </>
  );
}

function FieldName({ field, name }: { field: string; name: string }) {
  const prefix = field.endsWith(name) ? field.slice(0, field.length - name.length) : "";
  return (
    <code className={styles.fieldName} title={field !== name ? field : undefined}>
      {prefix && <span className={styles.visuallyHidden}>{prefix}</span>}
      {name}
    </code>
  );
}

type ResponseNode = {
  row: FieldRow;
  index: number;
  children: ResponseNode[];
};

function responseTree(rows: FieldRow[]): ResponseNode[] {
  const nodes: ResponseNode[] = rows.map((row, index) => ({ row, index, children: [] }));
  const roots: ResponseNode[] = [];

  for (const node of nodes) {
    const { parentIndex } = node.row;
    const parent = parentIndex != null && parentIndex < node.index ? nodes[parentIndex] : undefined;
    (parent?.children ?? roots).push(node);
  }

  return roots;
}

function ResponseFieldRows({ rows }: Pick<Props, "rows">) {
  const [collapsed, setCollapsed] = useState<Set<number>>(() => new Set());

  function toggle(index: number) {
    setCollapsed((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function renderRows(nodes: ResponseNode[], depth = 0): React.ReactNode {
    return nodes.map(({ row, index, children }) => {
      const hasChildren = children.length > 0;
      const expanded = hasChildren && !collapsed.has(index);
      const field = <FieldName field={row.field} name={row.name ?? row.field} />;

      return (
        <React.Fragment key={index}>
          <tr data-collapsible={hasChildren || undefined} style={{ "--tree-depth": depth } as CSSProperties}>
            <th scope="row" className={styles.responseFieldCell}>
              {hasChildren ? (
                <button
                  type="button"
                  className={styles.treeToggle}
                  aria-expanded={expanded}
                  aria-label={`${expanded ? "Collapse" : "Expand"} ${row.field}`}
                  onClick={() => toggle(index)}
                >
                  <span className={styles.treeChevron} aria-hidden="true" />
                  {field}
                </button>
              ) : field}
              {row.required === true && <span className={styles.required}>Required</span>}
              {row.required === false && <span className={styles.visuallyHidden}>Optional</span>}
            </th>
            <td><code className={styles.type}>{row.type}</code></td>
            <ResponseDetailCells description={row.description} details={row.details} />
          </tr>
          {expanded && renderRows(children, depth + 1)}
        </React.Fragment>
      );
    });
  }

  return <>{renderRows(responseTree(rows))}</>;
}

export default function ApiFieldTable({
  rows,
  fieldLabel = "Field",
  caption,
}: Props) {
  if (!rows.length) return null;

  const [firstField] = rows;
  const bearerAuthorization = caption === "Authorization" && rows.length === 1
    && firstField.type === "Bearer token" && firstField.required === true;
  const schema = fieldLabel === "Field";
  const response = schema && /^\w+ response fields /.test(caption);
  const responseHierarchy = response && rows.some(({ parentIndex }) => parentIndex !== undefined);
  const parents = new Set(
    rows.filter(({ type }) => type === "object" || type.endsWith("[]")).map(({ field }) => field),
  );

  return (
    <>
      <div
        className={response ? `${styles.frame} ${styles.responseFrame}` : styles.frame}
        role={response ? "region" : undefined}
        aria-label={response ? caption : undefined}
        tabIndex={response ? 0 : undefined}
      >
        <table className={response ? `${styles.table} ${styles.responseTable}` : styles.table}>
          <caption className={styles.visuallyHidden}>{caption}</caption>
          <colgroup>
            <col className={styles.fieldColumn} />
            <col className={styles.typeColumn} />
            {response && <col className={styles.exampleColumn} />}
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{bearerAuthorization ? "Header" : fieldLabel}</th>
              <th scope="col">Type</th>
              {response && <th scope="col">Example</th>}
              <th scope="col">{bearerAuthorization ? "Required" : "Details"}</th>
            </tr>
          </thead>
          <tbody>
            {responseHierarchy ? <ResponseFieldRows rows={rows} /> : rows.map(({ field, type, required, description, details }, index) => {
              const leafStart = field.lastIndexOf(".") + 1;
              const parent = field.slice(0, leafStart - 1);
              const nested = schema && leafStart > 0
                && (parents.has(parent) || parents.has(parent.replace(/(?:\[\])+$/, "")));
              const prefix = nested ? field.slice(0, leafStart) : "";
              const depth = nested ? Math.min(prefix.split(".").length - 1, 3) : undefined;

              return (
                <tr key={`${field}:${index}`}>
                  <th scope="row" className={styles.fieldCell} data-depth={depth}>
                    <FieldName field={field} name={field.slice(prefix.length)} />
                    {!bearerAuthorization && required === true && (
                      <span className={styles.required}>Required</span>
                    )}
                    {required === false && (
                      <span className={response ? styles.visuallyHidden : styles.optional}>Optional</span>
                    )}
                  </th>
                  <td><code className={styles.type}>{type}</code></td>
                  {response ? <ResponseDetailCells description={description} details={details} /> : (
                    <td>
                      {bearerAuthorization ? "Yes" : <FieldDetails description={description} details={details} />}
                      {!bearerAuthorization && !description && !details?.length && (
                        <span className={styles.empty}>&mdash;</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {bearerAuthorization && (
        <div className={styles.authorizationDetails}>
          <FieldDetails description={firstField.description} details={firstField.details} />
        </div>
      )}
    </>
  );
}
