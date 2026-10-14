import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { buildSync } from "esbuild";
import { JSDOM } from "jsdom";
const require = createRequire(import.meta.url);

test("project filters, dialog close, local video controls, mobile menu, and enquiry preparation", async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "https://vinayakdeshmuk.in/" },
  );
  for (const key of [
    "window",
    "document",
    "navigator",
    "HTMLElement",
    "HTMLDialogElement",
    "HTMLInputElement",
    "HTMLTextAreaElement",
    "HTMLSelectElement",
    "FormData",
    "Event",
    "MouseEvent",
    "KeyboardEvent",
  ])
    Object.defineProperty(globalThis, key, {
      value: dom.window[key],
      configurable: true,
      writable: true,
    });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  buildSync({
    entryPoints: ["App.tsx"],
    outfile: "node_modules/.cache/portfolio-ui-test.cjs",
    bundle: true,
    platform: "node",
    format: "cjs",
    jsx: "automatic",
    external: ["react", "react-dom", "react-dom/client"],
  });
  const React = require("react");
  const { act } = React;
  const { createRoot } = require("react-dom/client");
  const App = require("../node_modules/.cache/portfolio-ui-test.cjs").default;
  const root = createRoot(document.getElementById("root"));
  const click = async (el) => {
    assert.ok(el, "click target must exist");
    await act(async () =>
      el.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
  };
  await act(async () => root.render(React.createElement(App)));
  assert.equal(document.querySelectorAll(".project-card").length, 5);
  for (const a of document.querySelectorAll('a[href^="#"]'))
    assert.ok(
      document.getElementById(a.getAttribute("href").slice(1)),
      `Anchor ${a.getAttribute("href")} must exist`,
    );
  for (const a of document.querySelectorAll('a[target="_blank"]'))
    assert.match(a.rel, /noopener/);
  const bodyText = document.body.textContent;
  assert.doesNotMatch(
    bodyText,
    /TradeZend|Polymarket|Algo Trader|History.?s Minds|profit|win rate/i,
  );
  assert.doesNotMatch(
    document.body.innerHTML,
    /github\.com\/Vinayak19112003\/(branzyne|plato-reels|agent-video-studio|happy-paws-slots)/i,
  );
  await click(
    [...document.querySelectorAll(".work-filters button")].find(
      (b) => b.textContent === "Tools",
    ),
  );
  assert.equal(document.querySelectorAll(".project-card").length, 1);
  assert.match(
    document.querySelector(".project-card").textContent,
    /TraceReel/,
  );
  await click(
    [...document.querySelectorAll(".work-filters button")].find(
      (b) => b.textContent === "Video & motion",
    ),
  );
  assert.equal(document.querySelectorAll(".project-card").length, 2);
  await click(
    document.querySelector('[aria-label="Watch Branzyne — Brand Promo"]'),
  );
  assert.equal(document.querySelector("dialog").open, true);
  const video = document.querySelector("video");
  assert.equal(video.controls, true);
  assert.equal(video.autoplay, false);
  assert.equal(video.preload, "none");
  assert.equal(
    video.querySelector("source").getAttribute("src"),
    "/media/branzyne-promo.mp4",
  );
  assert.equal(document.body.style.overflow, "hidden");
  await act(async () =>
    document
      .querySelector("dialog")
      .dispatchEvent(new Event("cancel", { bubbles: true, cancelable: true })),
  );
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.body.style.overflow, "");
  await click(document.querySelector(".menu-toggle"));
  assert.equal(
    document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  await click(document.querySelector('#site-navigation a[href="#work"]'));
  assert.equal(
    document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  document.querySelector('[name="name"]').value = "Test Client";
  document.querySelector('[name="email"]').value = "client@example.com";
  document.querySelector('[name="service"]').value =
    "Video editing or brand film";
  document.querySelector('[name="brief"]').value =
    "A finished promotional video for our company website.";
  await act(async () =>
    document
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  const email = document.querySelector(".prepared-brief a");
  assert.ok(email);
  assert.match(email.href, /^mailto:vinayak19112003@gmail.com/);
  assert.match(new URL(email.href).searchParams.get("body"), /Test Client/);
  assert.match(
    document.querySelector(".form-note").textContent,
    /does not submit or store/,
  );
  await click(document.querySelector(".copy-button"));
  assert.match(
    document.querySelector('[role="status"]').textContent,
    /Copy is unavailable/,
  );
  await act(async () => {
    const s = document.querySelector('[name="service"]');
    s.value = "Website or application";
    s.dispatchEvent(new Event("change", { bubbles: true }));
  });
  assert.equal(document.querySelector(".prepared-brief"), null);
  await act(async () => root.unmount());
  dom.window.close();
});

test("public media references exist and production copy contains no private source links", () => {
  const data = readFileSync("data/projects.ts", "utf8");
  const app = readFileSync("App.tsx", "utf8");
  for (const match of (data + app).matchAll(
    /['"]\/(images|media)\/([^'"]+)['"]/g,
  ))
    assert.ok(
      existsSync("public/" + match[1] + "/" + match[2]),
      "Missing media " + match[0],
    );
  assert.doesNotMatch(
    data,
    /github\.com\/Vinayak19112003\/(branzyne|plato-reels|agent-video-studio|happy-paws-slots)/i,
  );
  assert.ok(existsSync("public/images/social-cover.jpg"));
});
