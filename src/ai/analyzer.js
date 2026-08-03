export default class AIAnalyzer {

    constructor(aiClient, planner) {

        this.ai = aiClient;
        this.planner = planner;

    }

    async analyze(request) {

        /*
         * Build Plan
         */

        const plan = await this.planner.plan(request);

        /*
         * Build Prompt
         */

        const messages = [

            {
                role: "system",

                content:
`Bạn là AI Agent của MCP AI Bridge.

Mục tiêu:

- Phân tích project
- Không đoán
- Chỉ sử dụng Context
- Nếu thiếu dữ liệu hãy yêu cầu đọc thêm file.
- Luôn giải thích ngắn gọn.`
            },

            {

                role: "user",

                content: JSON.stringify({

                    request,

                    context: plan.context,

                    actions: plan.actions,

                    tools: plan.tools

                }, null, 2)

            }

        ];

        /*
         * Call AI
         */

        const response =

            await this.ai.chat(

                messages

            );

        return {

            ok: true,

            plan,

            response

        };

    }

}
