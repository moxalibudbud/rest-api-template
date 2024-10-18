import { Router } from 'express';
import controller from '@controller/count-file.controller';

const router = Router();

router.get('/', controller.search);
router.get('/download/:filepath', controller.download);
router.get('/:id', controller.get);

export default router;