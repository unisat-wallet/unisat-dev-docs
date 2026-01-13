// import React, {type ReactNode} from 'react';
// import Layout from '@theme-original/DocItem/Layout';
// import type LayoutType from '@theme/DocItem/Layout';
// import type {WrapperProps} from '@docusaurus/types';

// type Props = WrapperProps<typeof LayoutType>;

// export default function LayoutWrapper(props: Props): ReactNode {
//   return (
//     <>
//       <Layout {...props} />
//     </>
//   );
// }

// src/theme/DocItem/Layout/index.tsx
import React from "react";
import OriginalLayout from "@theme-original/DocItem/Layout";
import { SwaggerSpecProvider } from "@site/src/components/SwaggerSpecProvider";

export default function DocItemLayout(props) {
  return (
    <SwaggerSpecProvider>
      <OriginalLayout {...props} />
    </SwaggerSpecProvider>
  );
}
