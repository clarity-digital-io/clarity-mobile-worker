import express from 'express';

var router = express.Router();

router.post('/', async (req, res) => {
	
	let organizationId = req.body.organizationId;

	console.log('organizationId', organizationId); 
	
});

export default router;
