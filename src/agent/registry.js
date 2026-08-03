import EventEmitter from "events";

export default class ToolRegistry extends EventEmitter {

    constructor(mcp) {

        super();

        this.mcp = mcp;

        this.tools = new Map();

        this.categories = new Map();

        this.aliases = new Map();

        this.ready = false;

        this.lastRefresh = 0;

    }

    async initialize() {

        await this.refresh();

        return this;

    }

    async refresh() {

        const result = await this.mcp.tools();

        this.tools.clear();

        this.categories.clear();

        this.aliases.clear();

        const list = result?.tools?.tools ??
                     result?.tools ??
                     [];

        for (const tool of list) {

            this.register(tool);

        }

        this.ready = true;

        this.lastRefresh = Date.now();

        this.emit("refresh", this.stats());

    }

    register(tool) {

        if (!tool) {

            return;

        }

        const name = tool.name;

        this.tools.set(name, tool);

        this.index(tool);

    }

    index(tool) {

        const name = tool.name.toLowerCase();

        const words = name.split("_");

        for (const word of words) {

            if (!this.categories.has(word)) {

                this.categories.set(

                    word,

                    new Set()

                );

            }

            this.categories

                .get(word)

                .add(tool.name);

        }

        this.aliases.set(

            name,

            tool.name

        );

    }

    has(name) {

        return this.tools.has(name);

    }

    get(name) {

        return this.tools.get(name);

    }

    list() {

        return Array.from(

            this.tools.values()

        );

    }

    names() {

        return Array.from(

            this.tools.keys()

        );

    }

    size() {

        return this.tools.size;

    }

    stats() {

        return {

            ready: this.ready,

            total: this.size(),

            lastRefresh: this.lastRefresh

        };

    }
        find(keyword = "") {

        keyword = keyword
            .toLowerCase()
            .trim();

        if (!keyword.length) {

            return [];

        }

        const result = [];

        for (const tool of this.tools.values()) {

            const name =
                tool.name.toLowerCase();

            const desc =
                (tool.description || "")
                    .toLowerCase();

            if (
                name.includes(keyword) ||
                desc.includes(keyword)
            ) {

                result.push(tool);

            }

        }

        return result;

    }

    search(text = "") {

        const words = text
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);

        const score = new Map();

        for (const word of words) {

            for (const tool of this.find(word)) {

                const current =
                    score.get(tool.name) || 0;

                score.set(

                    tool.name,

                    current + 1

                );

            }

        }

        return Array

            .from(score.entries())

            .sort(

                (a, b) => b[1] - a[1]

            )

            .map(

                ([name]) =>

                    this.get(name)

            );

    }

    suggest(goal = "") {

        const text =
            goal.toLowerCase();

        const rules = [

            {

                keys: [

                    "manifest",

                    "androidmanifest"

                ],

                tool:

                    "read_axml_file"

            },

            {

                keys: [

                    "class",

                    "activity",

                    "java",

                    "smali"

                ],

                tool:

                    "decompile_class"

            },

            {

                keys: [

                    "string",

                    "search",

                    "premium",

                    "vip",

                    "shell"

                ],

                tool:

                    "search_bytecode"

            },

            {

                keys: [

                    "resource",

                    "arsc"

                ],

                tool:

                    "query_arsc_resources"

            },

            {

                keys: [

                    "signature",

                    "certificate"

                ],

                tool:

                    "get_apk_signature"

            }

        ];

        for (const rule of rules) {

            for (const key of rule.keys) {

                if (text.includes(key)) {

                    return this.get(

                        rule.tool

                    );

                }

            }

        }

        return this.search(goal)[0];

    }

    validate(name, args = {}) {

        const tool =
            this.get(name);

        if (!tool) {

            throw new Error(

                "Unknown tool: " +

                name

            );

        }

        const schema =
            tool.inputSchema ||
            {};

        const required =
            schema.required ||
            [];

        for (const key of required) {

            if (

                args[key] ===
                undefined

            ) {

                throw new Error(

                    "Missing argument: " +

                    key

                );

            }

        }

        return true;

    }

    schema(name) {

        return this.get(name)

            ?.inputSchema;

    }

    export() {

        return {

            ready:
                this.ready,

            lastRefresh:
                this.lastRefresh,

            total:
                this.size(),

            tools:
                this.list()

        };

    }

    async ensure() {

        if (!this.ready) {

            await this.refresh();

        }

        return this;

    }

    async autoRefresh(
        interval = 300000
    ) {

        setInterval(

            async () => {

                try {

                    await this.refresh();

                }

                catch (e) {

                    this.emit(

                        "error",

                        e

                    );

                }

            },

            interval

        );

    }

}