import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/getting-started',
        'guides/command-palette-and-quick-commands',
        'guides/presets-and-reusable-launchers',
        'guides/overview-and-canvas',
        'guides/dynamic-island',
        'guides/diff-and-review',
        'guides/lifecycle-hooks',
        'guides/hidden-features',
      ],
    },
    {
      type: 'category',
      label: 'Workflows',
      collapsed: false,
      items: [
        'workflows/worktrees-and-sessions',
        'workflows/remote-sessions-and-ssh',
        'workflows/agents-and-hapi',
        'workflows/agent-control-cli',
        'workflows/hapi',
        'workflows/workspace-workflows',
      ],
    },
  ],
};

export default sidebars;
