import test from "node:test";
import assert from "node:assert/strict";
import {
  buildProjectBrief,
  buildProjectMailto,
  contactEmail,
} from "../lib/enquiry.mjs";

test("project email preserves Unicode, references and line breaks without splitting query parameters", () => {
  const fields = {
    name: "Vinayak & team",
    email: "hello@example.com",
    service: "Video & motion",
    budget: "₹25,000–₹50,000",
    deadline: "2026-12-01",
    brief: "Tamil: வணக்கம்\nReference: https://example.com/?a=1&b=2\nUse #red.",
  };
  const mail = new URL(buildProjectMailto(fields));
  assert.equal(mail.protocol, "mailto:");
  assert.equal(mail.pathname, contactEmail);
  assert.equal(
    mail.searchParams.get("subject"),
    "Project enquiry: Video & motion",
  );
  assert.equal(mail.searchParams.get("body"), buildProjectBrief(fields));
  assert.equal([...mail.searchParams].length, 2);
  assert.match(mail.searchParams.get("body"), /வணக்கம்/);
});
test("optional budget and deadline produce a complete honest brief", () => {
  const brief = buildProjectBrief({
    name: "  Client  ",
    email: "client@example.com",
    service: "Website",
    brief: "A booking app for my studio.",
  });
  assert.match(brief, /Name: Client\n/);
  assert.match(brief, /Budget range: To discuss/);
  assert.match(brief, /Target date: Flexible/);
  assert.doesNotMatch(brief, /undefined|null/);
});
