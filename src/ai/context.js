export default class ContextBuilder {

    constructor(workspace, search, indexer) {

        this.workspace = workspace;
        this.search = search;
        this.indexer = indexer;

    }

    async build(options = {}) {

        const context = {

            workspace: this.workspace.workspace(),

            currentFile: null,

            currentContent: null,

            relatedFiles: [],

            manifest: null,

            buildGradle: [],

            index: this.indexer.count(),

            timestamp: Date.now()

        };

        if (options.currentFile) {

            context.currentFile = options.currentFile;

            try {

                context.currentContent =
                    await this.workspace.read(
                        options.currentFile
                    );

            }

            catch {

            }

        }

        const manifest = this.indexer
            .get()
            .manifest;

        if (manifest.length > 0) {

            try {

                context.manifest =
                    await this.workspace.read(

                        manifest[0]

                    );

            }

            catch {

            }

        }

        context.buildGradle =

            this.indexer
                .get()
                .gradle;

        if (options.keyword) {

            context.relatedFiles =

                await this.search.text(

                    options.keyword

                );

        }

        return context;

    }

}
