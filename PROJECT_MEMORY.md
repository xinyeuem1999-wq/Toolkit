# PROJECT_MEMORY

## Project identity

- Repository: `xinyeuem1999-wq/Toolkit`
- Project name in source/docs: **MCP AI Bridge**
- Current package version: `1.0.0`
- Git default branch: `main`
- Runtime: Node.js / Express, ES modules
- Node requirement: `>=20`
- Primary purpose: bridge an Android development workspace with AI and MCP tooling.

## Architecture

The current application is composed of:

- `src/server.js` — process bootstrap, configuration loading, HTTP server startup.
- `src/app.js` — dependency wiring for MCP, workspace, search/indexing, AI planning/analyzing/editing, and router registration.
- `src/api/router.js` — HTTP API routes.
- `src/mcp/` — MCP client and workspace/search/indexing components.
- `src/ai/` — AI client, context builder, planner, analyzer, and editor.
- `config/config.json` — runtime configuration.

Configured services:

- Bridge: `127.0.0.1:6768`
- MCP: `http://127.0.0.1:6767`
- Workspace home: `/storage/emulated/0/AndroStudioProjects`
- Workspace indexing: enabled
- Workspace watching: enabled

## Current implemented surface

The router currently defines endpoints for:

- `GET /`
- `GET /health`
- `GET /config`
- `GET /mcp/status`
- `GET /mcp/tools`
- `POST /analyze`
- `POST /agent`
- `POST /chat`
- `POST /edit`
- `POST /apply`
- `POST /search`
- `GET /index`
- `GET /workspace`

The implementation also includes a Tool Registry in the current source history, intended to discover, index, search, and suggest MCP tools.

## Verified vs. unverified

The repository's last recorded project-memory state marked the following as verified: server startup, root endpoint, health endpoint, and config endpoint.

The following were explicitly unverified at that point and remain release blockers until tested against the current source/runtime:

- workspace endpoint
- index endpoint
- search endpoint
- MCP connection
- AI connection

Do not treat an implemented route as production-verified until it has been exercised successfully.

## Development environment context

Recent work outside the repository established a working Ubuntu 24.04.3 LTS ARM64 environment inside Termux using Proot. The Ubuntu rootfs is under the Termux home directory as `~/root`, and the environment can reach an interactive `root@localhost` shell with `apt` available.

This is development-environment context, not yet a repository feature. The environment should be documented separately and must not be represented as a completed AI Workspace capability until the corresponding setup is reproducible from the repository.

## Working rules

- Patch first; overwrite only when necessary.
- Test after each sprint/change set.
- Do not commit known-broken code.
- Back up before major changes.
- Keep documentation synchronized with verified implementation rather than intended architecture.

## Naming/version consistency issue

The repository currently contains inconsistent project metadata: the repository is `Toolkit`, the README/package identify `MCP AI Bridge`, while the older project memory in the latest commit references `xinyeuem1999-wq/mcp-ai-bridge` and version `0.1.0-alpha`. The runtime config and package currently use version `1.0.0`.

This should be normalized before a formal release.
