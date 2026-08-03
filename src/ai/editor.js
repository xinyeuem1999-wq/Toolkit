export default class AIEditor {

    constructor(aiClient, planner, workspace) {

        this.ai = aiClient;
        this.planner = planner;
        this.workspace = workspace;

    }

    async edit(request) {

        if (!request.file) {

            throw new Error(
                "Missing request.file"
            );

        }

        const plan = await this.planner.plan(request);

        const source = await this.workspace.read(
            request.file
        );

        const messages = [

            {
                role: "system",

                content:
`Bạn là AI chuyên chỉnh sửa mã nguồn.

Quy tắc:

- Không giải thích dài dòng.
- Chỉ trả về mã nguồn hoàn chỉnh.
- Không sử dụng markdown.
- Không thêm dấu \`\`\`.
- Không rút gọn nội dung.
- Giữ nguyên định dạng file.`

            },

            {

                role: "user",

                content: JSON.stringify({

                    instruction:

                        request.instruction,

                    file:

                        request.file,

                    source,

                    context:

                        plan.context

                })

            }

        ];

        const response =

            await this.ai.chat(

                messages

            );

        let content = "";

        try {

            content =

                response
                    .choices[0]
                    .message
                    .content;

        }

        catch {

            throw new Error(
                "Invalid AI response"
            );

        }

        return {

            ok: true,

            file: request.file,

            original: source,

            edited: content,

            apply: false

        };

    }

    async apply(result) {

        await this.workspace.write(

            result.file,

            result.edited

        );

        return {

            ok: true,

            saved: true,

            file: result.file

        };

    }

}
