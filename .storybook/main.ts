import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Required
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  // Optional
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  docs: {
    autodocs: "tag",
  },
};
export default config;
