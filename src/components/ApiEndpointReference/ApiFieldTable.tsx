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
  variant?: "parameters" | "schema" | "headers";
};

type DetailProps = Pick<FieldRow, "description" | "details">;

function FieldDetails({ description, details }: DetailProps) {
  return (
    <>
      {description && <div className={styles.description}>{description}</div>}
      {!!details?.length && (
        <dl className={styles.details}>
          {details.map(({ label, value }, index) => (
            <div key={`${label}:${index}`}>
              <dt>{label}:</dt>
              <dd><code>{value}</code></dd>
            </div>
          ))}
        </dl>
      )}
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

type SchemaNode = {
  row: FieldRow;
  index: number;
  children: SchemaNode[];
};

function schemaTree(rows: FieldRow[]): SchemaNode[] {
  const nodes: SchemaNode[] = rows.map((row, index) => ({ row, index, children: [] }));
  const roots: SchemaNode[] = [];

  for (const node of nodes) {
    const { parentIndex } = node.row;
    const parent = parentIndex != null && parentIndex < node.index ? nodes[parentIndex] : undefined;
    (parent?.children ?? roots).push(node);
  }

  return roots;
}

function SchemaFieldRows({ rows }: Pick<Props, "rows">) {
  const [collapsed, setCollapsed] = useState<Set<number>>(() => new Set());

  function toggle(index: number) {
    setCollapsed((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function renderRows(nodes: SchemaNode[], depth = 0): React.ReactNode {
    return nodes.map(({ row, index, children }) => {
      const hasChildren = children.length > 0;
      const expanded = hasChildren && !collapsed.has(index);
      const field = <FieldName field={row.field} name={row.name ?? row.field} />;

      return (
        <React.Fragment key={index}>
          <tr data-collapsible={hasChildren || undefined} style={{ "--tree-depth": depth } as CSSProperties}>
            <th scope="row" className={styles.schemaFieldCell}>
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
            <td><FieldDetails description={row.description} details={row.details} /></td>
          </tr>
          {expanded && renderRows(children, depth + 1)}
        </React.Fragment>
      );
    });
  }

  return <>{renderRows(schemaTree(rows))}</>;
}

export default function ApiFieldTable({
  rows,
  fieldLabel = "Field",
  caption,
  variant = "parameters",
}: Props) {
  if (!rows.length) return null;

  const [firstField] = rows;
  const bearerAuthorization = caption === "Authorization" && rows.length === 1
    && firstField.type === "Bearer token" && firstField.required === true;
  const headers = bearerAuthorization || variant === "headers";
  const schema = variant === "schema";

  return (
    <>
      <div
        className={schema ? `${styles.frame} ${styles.schemaFrame}` : styles.frame}
        role={schema ? "region" : undefined}
        aria-label={schema ? caption : undefined}
        tabIndex={schema ? 0 : undefined}
      >
        <table className={schema ? `${styles.table} ${styles.schemaTable}` : styles.table}>
          <caption className={styles.visuallyHidden}>{caption}</caption>
          <colgroup>
            <col className={styles.fieldColumn} />
            <col className={styles.typeColumn} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{headers ? "Header" : fieldLabel}</th>
              <th scope="col">Type</th>
              <th scope="col">{headers ? "Required" : "Details"}</th>
            </tr>
          </thead>
          <tbody>
            {schema ? <SchemaFieldRows rows={rows} /> : rows.map(({ field, type, required, description, details }, index) => (
              <tr key={`${field}:${index}`}>
                <th scope="row">
                  <FieldName field={field} name={field} />
                  {!headers && required === true && (
                    <span className={styles.required}>Required</span>
                  )}
                  {!headers && required === false && <span className={styles.optional}>Optional</span>}
                </th>
                <td><code className={styles.type}>{type}</code></td>
                <td>
                  {headers ? (required ? "Yes" : "No") : <FieldDetails description={description} details={details} />}
                  {!headers && !description && !details?.length && (
                    <span className={styles.empty}>&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
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
