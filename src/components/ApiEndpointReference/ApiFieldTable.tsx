import React from "react";
import styles from "./fields.module.css";

type FieldRow = {
  field: string;
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

export default function ApiFieldTable({
  rows,
  fieldLabel = "Field",
  caption,
}: Props) {
  if (!rows.length) return null;

  return (
    <div className={styles.frame}>
      <table className={styles.table}>
        <caption className={styles.visuallyHidden}>{caption}</caption>
        <colgroup>
          <col className={styles.fieldColumn} />
          <col className={styles.typeColumn} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">{fieldLabel}</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ field, type, required, description, details }, index) => {
            const leafStart = field.lastIndexOf(".") + 1;
            return (
              <tr key={`${field}:${index}`}>
                <th scope="row">
                  <code className={styles.fieldName}>
                    {leafStart > 0 && (
                      <span className={styles.fieldPath}>
                        {field.slice(0, leafStart)}
                      </span>
                    )}
                    {field.slice(leafStart)}
                  </code>
                  {required === true && (
                    <span className={styles.required}>Required</span>
                  )}
                  {required === false && (
                    <span className={styles.optional}>Optional</span>
                  )}
                </th>
                <td><code className={styles.type}>{type}</code></td>
                <td>
                  {description && <div className={styles.description}>{description}</div>}
                  {!!details?.length && (
                    <dl className={styles.details}>
                      {details.map(({ label, value }, detailIndex) => (
                        <div key={`${label}:${detailIndex}`}>
                          <dt>{label}</dt>
                          <dd><code>{value}</code></dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {!description && !details?.length && (
                    <span className={styles.optional}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
