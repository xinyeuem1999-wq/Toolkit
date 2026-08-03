export default class AIPlanner {

    constructor(contextBuilder, mcpClient) {

        this.contextBuilder = contextBuilder;
        this.mcp = mcpClient;

    }

    async plan(request) {

        const plan = {

            request,

            context: null,

            actions: [],

            tools: []

        };

        /*
         * Search
         */

        if (request.keyword) {

            plan.actions.push(

                "workspace.search"

            );

        }

        /*
         * Read File
         */

        if (request.file) {

            plan.actions.push(

                "workspace.read"

            );

        }

        /*
         * Build Context
         */

        plan.context =

            await this.contextBuilder.build({

                currentFile:

                    request.file,

                keyword:

                    request.keyword

            });

        /*
         * MCP

         */

        if (

            request.useMcp === true

        ) {

            plan.tools.push(

                "tools/list"

            );

        }

        /*
         * Build

         */

        if (

            request.build === true

        ) {

            plan.tools.push(

                "build"

            );

        }

        /*
         * APKTool

         */

        if (

            request.apktool === true

        ) {

            plan.tools.push(

                "apktool"

            );

        }

        /*
         * JADX

         */

        if (

            request.jadx === true

        ) {

            plan.tools.push(

                "jadx"

            );

        }

        /*
         * Git

         */

        if (

            request.git === true

        ) {

            plan.tools.push(

                "git"

            );

        }

        /*
         * Frida

         */

        if (

            request.frida === true

        ) {

            plan.tools.push(

                "frida"

            );

        }

        /*
         * ADB

         */

        if (

            request.adb === true

        ) {

            plan.tools.push(

                "adb"

            );

        }

        return plan;

    }

}
