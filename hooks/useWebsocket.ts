import { useState } from "react";

// Enhanced mock thoughts data for serverless operation
const MOCK_THOUGHTS = {
  react:
    "react hooks, react components, react state management, react performance",
  javascript:
    "javascript es6, javascript async, javascript promises, javascript modules",
  next: "next.js routing, next.js api routes, next.js deployment, next.js optimization",
  css: "css flexbox, css grid, css animations, css variables",
  html: "html semantic, html accessibility, html forms, html validation",
  api: "api design, api testing, api documentation, api security",
  web: "web development, web performance, web security, web accessibility",
  design: "design systems, design patterns, design thinking, design tools",
  code: "code review, code quality, code documentation, code architecture",
  test: "test driven development, unit testing, integration testing, e2e testing",
  typescript: "typescript types, typescript interfaces, typescript generics",
  node: "node.js server, node.js modules, node.js performance",
  database: "database design, database optimization, database queries",
  git: "git workflow, git branching, git collaboration, git best practices",
  docker: "docker containers, docker compose, docker deployment",
  aws: "aws services, aws deployment, aws architecture, aws security",
  python: "python programming, python frameworks, python libraries",
  java: "java development, java spring, java performance, java best practices",
  mobile: "mobile development, mobile ui, mobile performance, mobile testing",
  ai: "artificial intelligence, machine learning, ai tools, ai ethics",
};

export default function useWebsocket() {
  const [lastMessage, setLastMessage] = useState(null);

  const sendMessage = (message) => {
    // Simulate serverless thought generation
    const query = message.toLowerCase().trim();
    const thoughts =
      MOCK_THOUGHTS[query] ||
      Object.entries(MOCK_THOUGHTS)
        .filter(([key]) => key.includes(query) || query.includes(key))
        .map(([, value]) => value)
        .join(", ") ||
      `${query} tutorial, ${query} examples, ${query} best practices, ${query} guide`;

    // Simulate network delay
    setTimeout(() => {
      setLastMessage(thoughts);
    }, 100);
  };

  return { sendMessage, lastMessage };
}
