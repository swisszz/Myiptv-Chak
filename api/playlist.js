export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';

  // ตรวจสอบว่าเป็นการเข้าถึงจากเบราว์เซอร์หรือไม่
  const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edge|Opera/i.test(userAgent);
  if (isBrowser) {
    return res.status(403).send('403 Forbidden - Browser access denied');
  }

  const m3uUrl = 'https://raw.githubusercontent.com/swisszz/turkmetmet/refs/heads/main/Memetturk';
  try {
    const response = await fetch(m3uUrl);
    const m3uContent = await response.text();

    res.setHeader('Content-Type', 'application/x-mpegURL');
    res.status(200).send(m3uContent);
  } catch (error) {
    res.status(500).send('Error fetching M3U content');
  }
}
