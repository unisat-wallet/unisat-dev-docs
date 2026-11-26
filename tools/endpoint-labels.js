function endpointSidebarLabel({ opId, summary, operation }) {
  const override = operation?.["x-sidebar-label"];
  if (typeof override === "string" && override.trim()) return override.trim();
  return summary || opId;
}

module.exports = { endpointSidebarLabel };
