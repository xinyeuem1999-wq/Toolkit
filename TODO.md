# TODO

## P0 — Release blockers

- [ ] Repair `src/api/router.js` so `/agent` and `/chat` are independent top-level route registrations.
- [ ] Run `npm install` from a clean checkout and confirm dependency installation.
- [ ] Run `npm run check` and fix all syntax/runtime bootstrap errors.
- [ ] Start the bridge and verify `GET /`, `/health`, `/config`, `/mcp/status`, `/mcp/tools`, `/index`, and `/workspace`.
- [ ] Verify `POST /analyze`, `/agent`, `/chat`, `/edit`, `/apply`, and `/search` with controlled inputs.
- [ ] Verify MCP initialization, ping, reconnection, and tool discovery against the configured MCP server.
- [ ] Verify AI authentication and request/response handling without storing credentials in the repository.

## P1 — Core functionality

- [ ] Validate workspace path handling on Android/Termux and Ubuntu Proot.
- [ ] Validate automatic workspace indexing and watch behavior.
- [ ] Add deterministic test fixtures for workspace search and indexing.
- [ ] Validate AI context construction and planner output on a representative Android project.
- [ ] Validate editor planning versus actual file application and backup behavior.
- [ ] Validate Tool Registry refresh/search/suggestion behavior against real MCP tools.
- [ ] Add structured error handling and consistent API response contracts.

## P1 — Integration

- [ ] Implement and verify Git integration.
- [ ] Implement and verify APKTool integration.
- [ ] Implement and verify JADX integration.
- [ ] Implement and verify ADB integration.
- [ ] Implement and verify Frida integration.
- [ ] Define safe command execution boundaries for external tools.

## P2 — Project quality

- [ ] Add automated tests for router, MCP client, workspace, indexer, search, AI planner, analyzer, and editor.
- [ ] Add CI for syntax checks and tests.
- [ ] Add `.env.example` and document required environment variables.
- [ ] Normalize project naming (`Toolkit` vs `MCP AI Bridge`) and version metadata (`0.1.0-alpha` vs `1.0.0`).
- [ ] Document the supported Node.js and Android/Termux development environments.
- [ ] Add reproducible Ubuntu Proot bootstrap documentation.
- [ ] Document backup/restore and recovery procedures.

## P2 — Documentation

- [ ] Keep `PROJECT_MEMORY.md`, `SESSION_LOG.md`, `CHANGELOG.md`, and `TODO.md` synchronized after each milestone.
- [ ] Add API reference with request/response examples.
- [ ] Add architecture diagram and component ownership notes.
- [ ] Add development workflow for Android/Termux + Ubuntu Proot.
