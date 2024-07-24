import { savePreviousStats } from "@/actions/github";

export async function GET() {
  try {
    const response = await savePreviousStats();
    return Response.json(
      { message: "Commits Updated", data: response },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Something went wrong..", { status: 500 });
  }
}
