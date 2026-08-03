import fs from "node:fs/promises";
import path from "node:path";

export default class Workspace {

    constructor(config) {

        this.config = config;

        this.root = config.project.workspace.home;

    }

    workspace() {

        return this.root;

    }

    resolve(file) {

        return path.join(

            this.root,

            file

        );

    }

    async exists(file) {

        try {

            await fs.access(

                this.resolve(file)

            );

            return true;

        }

        catch {

            return false;

        }

    }

    async read(file) {

        return fs.readFile(

            this.resolve(file),

            "utf8"

        );

    }

    async write(file, content) {

        await fs.writeFile(

            this.resolve(file),

            content,

            "utf8"

        );

    }

    async mkdir(dir) {

        await fs.mkdir(

            this.resolve(dir),

            {

                recursive: true

            }

        );

    }

    async remove(file) {

        await fs.rm(

            this.resolve(file),

            {

                recursive: true,

                force: true

            }

        );

    }

    async list(dir = "") {

        return fs.readdir(

            this.resolve(dir),

            {

                withFileTypes: true

            }

        );

    }

    async stat(file) {

        return fs.stat(

            this.resolve(file)

        );

    }

}

