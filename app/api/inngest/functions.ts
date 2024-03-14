import { inngest } from "./client";
import axios from "axios";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        const serverRes = await axios.get("https://nakson.services/api/server-url");
        const { serverURL } = serverRes.data;
        const res = await axios.get(`${serverURL}/kewl`);
        console.log("res: ", res.data);
        return { event, body: res.data };
    },
);