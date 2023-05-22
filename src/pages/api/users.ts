export default async function handler(req, res) {
  try {
    const { q } = req.query;

    const response = await fetch(`https://dummyjson.com/users/search?q=${q}&limit=10`);;
    const data = await response.json();

    if (data && data.users) {
      const users = data.users || [];
      res.status(200).json(users);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}