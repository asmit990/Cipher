import 'dotenv/config';
import express from 'express';
import healthRoute from './routes/health.js';
import ticketsRoute from './routes/tickets.js';
import zendeskWebhook from './routes/zendesk.js';

const app = express();


app.use(express.json({
    verify: (req, _res, buf) => {
        (req as any).rawBody = buf.toString('utf8');
    },
}));

app.use('/', healthRoute);
app.use('/api', ticketsRoute);
app.use('/api', zendeskWebhook);


app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));