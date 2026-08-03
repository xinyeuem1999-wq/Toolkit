import createRouter from "./api/router.js";

import MCPClient from "./mcp/client.js";
import Workspace from "./mcp/workspace.js";
import WorkspaceSearch from "./mcp/search.js";
import WorkspaceIndexer from "./mcp/indexer.js";

import AIClient from "./ai/client.js";
import ContextBuilder from "./ai/context.js";
import AIPlanner from "./ai/planner.js";
import AIAnalyzer from "./ai/analyzer.js";
import AIEditor from "./ai/editor.js";

export default function createApp(app, config) {

    /*
     * MCP
     */

    const mcp = new MCPClient(config);

    /*
     * Workspace
     */

    const workspace = new Workspace(config);

    const search = new WorkspaceSearch(workspace);

    const indexer = new WorkspaceIndexer(
        workspace,
        search
    );

    /*
     * AI
     */

    const ai = new AIClient(config);

    const context = new ContextBuilder(
        workspace,
        search,
        indexer
    );

    const planner = new AIPlanner(
        context,
        mcp
    );

    const analyzer = new AIAnalyzer(
        ai,
        planner
    );

    const editor = new AIEditor(
        ai,
        planner,
        workspace
    );

    /*
     * Build Workspace Index
     */

    indexer.build()
        .then(() => {

            console.log(
                "Workspace indexed."
            );

        })
        .catch(console.error);

    /*
     * Router
     */

    app.use(

        "/",

        createRouter({

            analyzer,

            editor,

            workspace,

            search,

            indexer,

            mcp

        })

    );

}
