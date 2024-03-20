import { serve } from "inngest/next";
import { inngest } from "../inngest/client";
import { bookOrders, fulfillOrders } from "../inngest/functions";
export const runtime = "edge";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        fulfillOrders, // <-- This is where you'll always add all your functions
        bookOrders
    ],
    streaming: "allow",
});