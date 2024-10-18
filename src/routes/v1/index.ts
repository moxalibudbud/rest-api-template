import { Router } from 'express';
import helloRoutes from './hello';
import itemMasterRoutes from './item-master.route';
import countFileRoutes from './count-file.route';
import sohRoutes from './soh.route';

const router = Router();

router.use('/hello', helloRoutes);
router.use('/item-master', itemMasterRoutes);
router.use('/count-file', countFileRoutes);
router.use('/soh', sohRoutes);

export default router;