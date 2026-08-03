import express from "express";

export default function createRouter({
    analyzer,
    editor,
    workspace,
    search,
    indexer,
    mcp
}) {
    const router = express.Router();

    /*
     * Root
     */
    router.get("/", (req, res) => {
        res.json({
            ok: true,
            service: "MCP AI Bridge"
        });
    });

    /*
     * Health
     */
    router.get("/health", async (req, res) => {
        let connected = false;

        try {
            connected = await mcp.ping();
        } catch {
            connected = false;
        }

        res.json({
            ok: true,
            uptime: process.uptime(),
            mcp: connected
        });
    });

    /*
     * MCP Status
     */
    /*
 * Config
 */

    router.get("/config", (req, res) => {

    res.json({

        ok: true,

        project: {

            name: "MCP AI Bridge",

            version: "1.0.0"

        },

        workspace: workspace.workspace(),

        mcp: mcp.status()

    });

});
     
     
    router.get("/mcp/status", (req, res) => {
        try {
            if (mcp && typeof mcp.status === "function") {
                return res.json({
                    ok: true,
                    ...mcp.status()
                });
            }

            return res.json({
                ok: true,
                connected: false,
                initialized: false,
                url: mcp?.url ?? null
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * MCP Tools
     */
    router.get("/mcp/tools", async (req, res) => {
        try {
            if (!mcp || typeof mcp.tools !== "function") {
                return res.status(501).json({
                    ok: false,
                    error: "MCP tools is not available."
                });
            }

            const tools = await mcp.tools();

            res.json({
                ok: true,
                tools
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * Analyze
     */
    router.post("/analyze", async (req, res) => {
        try {
            const result = await analyzer.analyze(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * Agent
     */
    router.post("/agent", async (req, res) => {
        try {
            if (!analyzer || typeof analyzer.analyze !== "function") {
                return res.status(501).json({
                    ok: false,
                    error: "Agent analyzer is not available."
                });
            }

            const result = await analyzer.analyze(req.body);

            res.json({
                ok: true,
                agent: result
            });
            
        }catch (e) {

    console.error(e);

    res.status(500).json({

        ok: false,

        error: e.message,

        response: e.response?.data ?? null
            });
        }

    /*
     * Chat (alias to analyze)
     */
    router.post("/chat", async (req, res) => {
        try {
            const result = await analyzer.analyze(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });
    });
    /*
     * Edit
     */
    router.post("/edit", async (req, res) => {
        try {
            const result = await editor.edit(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * Apply
     */
    router.post("/apply", async (req, res) => {
        try {
            const result = await editor.apply(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * Search
     */
    router.post("/search", async (req, res) => {
        try {
            const result = await search.text(req.body.keyword);
            res.json({
                ok: true,
                result
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    });

    /*
     * Index
     */
    router.get("/index", (req, res) => {
        res.json({
            ok: true,
            index: indexer.count()
        });
    });

    /*
     * Workspace
     */
    router.get("/workspace", (req, res) => {
        res.json({
            ok: true,
            workspace: workspace.workspace()
        });
    });

    return router;
}