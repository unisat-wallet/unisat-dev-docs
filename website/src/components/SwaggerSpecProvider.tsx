// src/components/SwaggerSpecProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

const SwaggerSpecContext = createContext<any>(null);

export function SwaggerSpecProvider({ children }) {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/swagger/openapi-swagger.yaml")
      .then((res) => res.text())
      .then((yamlText) => {
        // swagger-ui-react 支持 YAML 字符串
        setSpec(yamlText);
      });
  }, []);

  return (
    <SwaggerSpecContext.Provider value={spec}>
      {children}
    </SwaggerSpecContext.Provider>
  );
}

export function useSwaggerSpec() {
  return useContext(SwaggerSpecContext);
}
