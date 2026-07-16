const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');

// @route   POST /api/admin/verify
// @desc    Check whether the submitted x-admin-key header is valid
// @access  Private (admin key)
router.post('/verify', adminAuth, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
