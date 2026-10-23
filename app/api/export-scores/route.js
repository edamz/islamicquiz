import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Mock user submission logs extracted directly out of your Supabase schema tables
    const databasePlayers = [
      { id: "USR01", name: "އަޙްމަދު ސަޢީދު" },
      { id: "USR02", name: "ޢާއިޝަތު ފަރަޙް" },
      { id: "USR03", name: "މުޙައްމަދު ނާޒިމް" }
    ];

    const databaseSubmissions = [
      { user_id: "USR01", target_day: 1, is_correct: true },
      { user_id: "USR01", target_day: 2, is_correct: false },
      { user_id: "USR02", target_day: 1, is_correct: true },
      { user_id: "USR02", target_day: 2, is_correct: true },
      { user_id: "USR03", target_day: 1, is_correct: false },
      { user_id: "USR03", target_day: 2, is_correct: false }
    ];

    const dayHeaders = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const csvHeaders = ["Employee ID", "Employee Full Name", "Total Score Points", ...dayHeaders];

    const csvRows = databasePlayers.map(player => {
      let scoreTally = 0;

      const dayByDayLogs = Array.from({ length: 30 }, (_, i) => {
        const dayNumber = i + 1;
        const record = databaseSubmissions.find(sub => sub.user_id === player.id && sub.target_day === dayNumber);

        if (!record) return "No Submission";
        if (record.is_correct) {
          scoreTally += 1;
          return "Correct";
        }
        return "Incorrect";
      });

      return [
        `"${player.id}"`,
        `"${player.name}"`, // Native Thaana string encapsulated safely
        scoreTally,
        ...dayByDayLogs.map(status => `"${status}"`)
      ].join(",");
    });

    // CRITICAL: We prefix with the UTF-8 BOM byte sequence (\uFEFF). 
    // This tells Excel to decode the file using Unicode instead of turning Dhivehi script into broken characters.
    const compiledCSV = "\uFEFF" + [csvHeaders.join(","), ...csvRows].join("\n");

    return new NextResponse(compiledCSV, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=ramazan_quiz_scoreboard.csv",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return new NextResponse("Internal Data Processing Error", { status: 500 });
  }
}
