import {Router} from 'express';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
    res.send({message: "You have signed up"});
});

export default authRouter;