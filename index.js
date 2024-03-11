import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: 'TEST-7398648709366564-030823-6a74f09f7c17400a2716c806f3842f79-301795914',
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Soy el server! :)');
})

app.post('/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'ARS',
                },
            ],
            back_urls: {
                success: "https://shopping-card-blush.vercel.app/",
                failure: 'https://google.com',
                pending: 'https://google.com',
            },
            auto_return: 'approved',
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        });
    } catch (e){
        console.log(e);
        res.status(500).json({
            error: "error al crear la preferencia :c",
        });
    }
});

app.listen(port, () => {
    console.log(`el servidor esta corriendo por el puerto ${port}`);
});

