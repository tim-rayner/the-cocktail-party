import connect from "@/app/lib/connectDB";

export async function register() {
  await connect();
}
