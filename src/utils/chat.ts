// src/utils/chat.ts

export async function sendMessageToBackend(message: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "No response from backend.";
  } catch (error: any) {
    console.error("Error sending message to backend:", error.message);
    return "Error communicating with the server.";
  }
}
