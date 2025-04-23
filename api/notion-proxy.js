export default async function handler(req, res) {
    const NOTION_DB_ID = process.env.NOTION_DB_ID;
    const NOTION_TOKEN = process.env.NOTION_TOKEN;
  
    try {
      const notionRes = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      });
  
      const data = await notionRes.json();
  
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
      res.status(200).json(data);
    } catch (error) {
      console.error("Error desde el proxy:", error);
      res.status(500).json({ error: "Error al consultar Notion" });
    }
  }

  // Este es un comentario para forzar el redeploy
