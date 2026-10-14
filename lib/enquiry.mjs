export const contactEmail = "vinayak19112003@gmail.com";
export function buildProjectBrief(fields) {
  const value = (key) => String(fields[key] ?? "").trim();
  return [
    "Hi Vinayak,",
    "",
    "I would like to discuss a project.",
    "",
    `Name: ${value("name")}`,
    `Email: ${value("email")}`,
    `Service: ${value("service")}`,
    `Budget range: ${value("budget") || "To discuss"}`,
    `Target date: ${value("deadline") || "Flexible"}`,
    "",
    "Project brief:",
    value("brief"),
  ].join("\n");
}
export function buildProjectMailto(fields) {
  const subject = `Project enquiry: ${String(fields.service ?? "New project").trim()}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildProjectBrief(fields))}`;
}
