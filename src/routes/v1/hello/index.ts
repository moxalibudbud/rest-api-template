import { Response, Request, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => res.send('Hello World!'));

export default router;