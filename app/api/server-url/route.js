// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic"; // defaults to auto
// import { PrismaClient } from "../../../generated/client";

// const prisma = new PrismaClient();
// export async function GET(request) {
//   // Return a JSON response with the server URL
//   const email = "123@gmail.com";
//   const password = "123123123";
//   let newUser = "";

//   // Create a new user
//   try {
//     newUser = await prisma.user.create({
//       data: {
//         firstName: "Hamad",
//         lastName: "Ali",
//         email,
//         password, // Note: For security, password hashing should be used in a real-world scenario
//         phone: "null",
//         address: "null",
//         token: "null",
//       },
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
//   return Response.json({ serverURL: newUser });

//   // return Response.json({ serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL });
// }
// ______________

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = "postgresql://postgres:sed123@localhost:5432/postgres?sslmode=disable";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
export async function GET(request) {
  // Return a JSON response with the server URL
  const email = "123@gmail.com";
  const password = "123123123";
  let newUser = "";

  // Create a new user
  try {
    newUser = await prisma.user.create({
      data: {
        firstName: "Hamad",
        lastName: "Ali",
        email,
        password, // Note: For security, password hashing should be used in a real-world scenario
        phone: "null",
        address: "null",
        token: "null",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
  return Response.json({ serverURL: newUser });

  // return Response.json({ serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL });
}
