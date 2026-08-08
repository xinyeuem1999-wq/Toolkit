# AI Workspace Status

## Scope

This document records the repository state reviewed on 2026-08-09. It separates implemented code from verified runtime behavior.

## Current architecture

```text
Client / Android development workspace
              |
              v
       Node / Express Bridge :6768
              |
      +-------+--------+
      |                |
      v                v
   Workspace          MCP Client :6767
      |                |
  Search/Indexer      Tools
      |
      v
 AI Context -> Planner -> Analyzer / Editor
```

## Implemented components

- Express server bootstrap and middleware.
- Runtime JSON configuration.
- Workspace abstraction.
- Workspace search and indexer.
- MCP client integration points.
- AI client/context/planner/analyzer/editor components.
- API router.
- Tool Registry in the latest source history.
- Configuration entries for Git, APKTool, JADX, ADB, and Frida.

## Current API surface

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Service identity |
| GET | `/health` | Health and MCP ping |
| GET | `/config` | Runtime/project status |
| GET | `/mcp/status` | MCP status |
| GET | `/mcp/tools` | MCP tool discovery |
| POST | `/analyze` | AI analysis |
| POST | `/agent` | Agent/analyzer entry point |
| POST | `/chat` | Chat/analyzer alias |
| POST | `/edit` | Edit planning/execution |
| POST | `/apply` | Apply editor result |
| POST | `/search` | Workspace search |
| GET | `/index` | Index count |
| GET | `/workspace` | Workspace information |

## Verification state

The implementation exists, but the last recorded project state explicitly left workspace, index, search, MCP, and AI connectivity unverified. Therefore the project should currently be treated as **foundation / integration stage**, not production-ready.

## Code-quality finding

The current router source places the `/chat` route declaration before the `/agent` route handler has been closed. The braces/closures should be rearranged so both routes are registered during application construction. This should be fixed before endpoint verification.

## Configuration findings

- Bridge: `127.0.0.1:6768`
- MCP: `http://127.0.0.1:6767`
- Workspace: `/storage/emulated/0/AndroStudioProjects`
- Auto-index: enabled
- Watch: enabled
- Git auto-commit: disabled
- APKTool/JADX/ADB/Frida: enabled in configuration

## Environment note

The current development host also has a working Ubuntu 24.04.3 LTS ARM64 Proot environment under Termux. This is useful for development and tooling, but it is not yet a repository-tested deployment target.
