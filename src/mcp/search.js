import fs from "node:fs/promises";
import path from "node:path";

export default class WorkspaceSearch {

    constructor(workspace) {

        this.workspace = workspace;

    }

    async walk(dir = "") {

        const root = this.workspace.resolve(dir);

        const result = [];

        async function scan(current) {

            const entries = await fs.readdir(current, {
                withFileTypes: true
            });

            for (const entry of entries) {

                const full = path.join(current, entry.name);

                if (entry.isDirectory()) {

                    await scan(full);

                    continue;

                }

                result.push(full);

            }

        }

        await scan(root);

        return result;

    }

    async filesByExtension(ext) {

        const files = await this.walk();

        return files.filter(file =>
            file.endsWith(ext)
        );

    }

    async fileName(keyword) {

        const files = await this.walk();

        return files.filter(file =>
            path.basename(file)
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                )
        );

    }

    async text(keyword) {

        const files = await this.walk();

        const result = [];

        for (const file of files) {

            try {

                const text = await fs.readFile(
                    file,
                    "utf8"
                );

                if (
                    text.includes(keyword)
                ) {

                    result.push({
                        file,
                        keyword
                    });

                }

            }

            catch {

            }

        }

        return result;

    }

    async regex(pattern) {

        const reg = new RegExp(pattern);

        const files = await this.walk();

        const result = [];

        for (const file of files) {

            try {

                const text = await fs.readFile(
                    file,
                    "utf8"
                );

                if (reg.test(text)) {

                    result.push(file);

                }

            }

            catch {

            }

        }

        return result;

    }

}
