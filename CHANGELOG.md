# CHANGELOG

All notable project changes are recorded here.

## Unreleased — 2026-08-09

### Added

- Project memory documentation for the MCP AI Bridge architecture and current verification state.
- Session log for the latest repository review and development-environment work.
- Outstanding-task tracking for integration and verification work.
- Documentation of the current bridge, MCP, workspace, AI, and Android-tooling architecture.

### Reviewed

- Node.js/Express server bootstrap.
- Runtime configuration and service addresses.
- Workspace/indexer/search wiring.
- AI context/planner/analyzer/editor wiring.
- MCP status and tool endpoints.
- Agent/chat/edit/apply/search/index/workspace API surface.

### Known issues / release blockers

- `/agent` and `/chat` route registration in `src/api/router.js` requires correction and runtime testing.
- MCP connectivity is not verified by the repository's recorded project state.
- AI connectivity is not verified.
- Workspace/index/search endpoints are implemented but not recorded as verified.
- Project/repository/version naming is inconsistent across historical metadata, README, package metadata, and runtime configuration.
- No current CI/test evidence was found in the reviewed repository state.

## 2026-08-03

### Foundation

- Added initial MCP AI Bridge project structure.
- Added Node/Express server foundation.
- Added configuration for workspace, MCP, AI, Git, APKTool, JADX, ADB, and Frida integrations.
- Added workspace, search, indexer, MCP client, AI planner/context/analyzer/editor components.
- Added API router and initial bridge endpoints.
- Added Tool Registry implementation in the latest repository history.
