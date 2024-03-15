import { serve } from "inngest/next";
import { inngest } from "../inngest/client";
import { fulfillOrders } from "../inngest/functions";
export const runtime = "edge";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        fulfillOrders, // <-- This is where you'll always add all your functions
    ],
    streaming: "allow",
});