const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');
const adminAuth = require('../middlewares/adminAuth');

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.post('/', adminAuth, uploadFields, projectController.createProject);
router.put('/:id', adminAuth, uploadFields, projectController.updateProject);
router.delete('/:id', adminAuth, projectController.deleteProject);

module.exports = router;
