import axios from "axios";
export default class MCPClient {

    constructor(config) {

        this.config = config;

        this.url = config.mcp.url;

        this.timeout = config.mcp.timeout;

        this.connected = false;

        this.initialized = false;

        this.serverInfo = null;

        this.requestId = 1;

    }

    nextId() {

        return this.requestId++;

    }

    async rpc(method, params = {}) {

        const response = await axios.post(

            this.url,

            {
                jsonrpc: "2.0",
                id: this.nextId(),
                method,
                params
            },

            {
                timeout: this.timeout
            }

        );

        if (response.data.error) {

            throw new Error(response.data.error.message);

        }

        return response.data.result;

    }

    async initialize() {

        try {

            const result = await this.rpc(

                "initialize",

                {

                    protocolVersion: "2025-06-18",

                    clientInfo: {

                        name: "MCP AI Bridge",

                        version: "1.0.0"

                    },

                    capabilities: {}

                }

            );

            this.connected = true;

            this.initialized = true;

            this.serverInfo = result;

            return result;

        }

        catch (e) {

            this.connected = false;

            this.initialized = false;

            this.serverInfo = null;

            throw e;

        }

    }

    async connect() {

        if (this.initialized) {

            return this.serverInfo;

        }

        return await this.initialize();

    }

    async reconnect() {

        this.connected = false;

        this.initialized = false;

        this.serverInfo = null;

        return await this.initialize();

    }

    async tools() {

        await this.connect();

        return await this.rpc(

            "tools/list"

        );

    }

    async call(name, args = {}) {

        await this.connect();

        return await this.rpc(

            "tools/call",

            {

                name,

                arguments: args

            }

        );

    }

    async ping() {

        try {

            await this.tools();

            this.connected = true;

            return true;

        }

        catch {

            this.connected = false;

            return false;

        }

    }

    status() {

        return {

            connected: this.connected,

            initialized: this.initialized,

            url: this.url,

            requestId: this.requestId,

            server: this.serverInfo

        };

    }

    isConnected() {

        return this.connected;

    }

}