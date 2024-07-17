
import { savePreviousStats } from "@/actions/github";

export async function GET() {
  try {
    await savePreviousStats();
    return new Response("Commits Updated", { status: 200 });
  } catch(error) {
    return new Response("Something went wrong..", { status: 500 });
  }
}