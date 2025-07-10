import express from 'express';
import {PORT} from './config/env.js';

// Database imports 
import connectToMongoDB from './database/mongodb.js';

// Routes imports
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscription',subscriptionRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`);
    await connectToMongoDB();
});

export default app;