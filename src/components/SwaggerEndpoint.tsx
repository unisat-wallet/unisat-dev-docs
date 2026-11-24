// src/components/SwaggerEndpoint.tsx
import SwaggerUI from "swagger-ui-react";
import { useSwaggerSpec } from "./SwaggerSpecProvider";

export default function SwaggerEndpoint({ path, method }) {
  const spec = useSwaggerSpec();

  if (!spec) return <div>Loading API spec...</div>;

  return (
    <SwaggerUI
      spec={spec}
      deepLinking={false}
      displayOperationId={false}
      defaultModelsExpandDepth={-1}
      docExpansion="none"
      filter={(taggedOp) =>
        taggedOp.get("path") === path && taggedOp.get("method") === method
      }
    />
  );
}
