export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { query, top_k } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      input: query,
      file_search: {
        vector_store_ids: ["vs_68b6e64f67108191879faaa8afe01516"],
        max_num_results: top_k || 3
      }
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
