import { Redirect } from "@docusaurus/router";

type LegacyRedirectProps = {
  to: string;
};

export default function LegacyRedirect({ to }: LegacyRedirectProps) {
  return <Redirect to={to} />;
}
