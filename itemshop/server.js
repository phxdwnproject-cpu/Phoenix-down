const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/track-click', async (req, res) => {
  // Optional: Forward to HubSpot server-side if env configured
  const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  const email = req.body.email || req.body.contactEmail;
  try {
    if (hubspotToken && email) {
      // Create basic contact in HubSpot
      const resp = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: { email } })
      });
      if (!resp.ok) {
        const txt = await resp.text();
        console.warn('HubSpot contact create failed', resp.status, txt);
      }
    }
  } catch (err) {
    console.error('track-click error', err);
  }
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`ItemShop server listening on ${PORT}`));