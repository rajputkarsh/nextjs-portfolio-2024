
import { savePreviousStats } from "@/actions/github";

export async function GET() {
  try {
    const response = await savePreviousStats();
    return new Response(
      JSON.stringify({ message: "Commits Updated", data: response }),
      {
        status: 200,
      }
    );
  } catch(error) {
    return new Response("Something went wrong..", { status: 500 });
  }
}