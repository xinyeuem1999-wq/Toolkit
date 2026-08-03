import path from "node:path";

export default class WorkspaceIndexer {

    constructor(workspace, search) {

        this.workspace = workspace;
        this.search = search;

        this.index = {

            files: [],

            java: [],

            kotlin: [],

            smali: [],

            xml: [],

            json: [],

            gradle: [],

            manifest: [],

            other: []

        };

    }

    classify(file) {

        const ext = path.extname(file).toLowerCase();

        switch (ext) {

            case ".java":
                return "java";

            case ".kt":
                return "kotlin";

            case ".smali":
                return "smali";

            case ".xml":

                if (
                    path.basename(file) ===
                    "AndroidManifest.xml"
                ) {

                    return "manifest";

                }

                return "xml";

            case ".json":
                return "json";

            case ".gradle":

                return "gradle";

            default:

                return "other";

        }

    }

    async build() {

        this.index = {

            files: [],

            java: [],

            kotlin: [],

            smali: [],

            xml: [],

            json: [],

            gradle: [],

            manifest: [],

            other: []

        };

        const files = await this.search.walk();

        for (const file of files) {

            const type = this.classify(file);

            this.index.files.push(file);

            this.index[type].push(file);

        }

        return this.index;

    }

    get() {

        return this.index;

    }

    count() {

        return {

            files: this.index.files.length,

            java: this.index.java.length,

            kotlin: this.index.kotlin.length,

            smali: this.index.smali.length,

            xml: this.index.xml.length,

            json: this.index.json.length,

            gradle: this.index.gradle.length,

            manifest: this.index.manifest.length,

            other: this.index.other.length

        };

    }

}
