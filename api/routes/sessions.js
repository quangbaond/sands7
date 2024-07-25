var express = require('express');
var router = express.Router();

const sessions = require('../models/games/Sx5d');

const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/get/:type', jwtMiddleware.verifyToken, async (req, res, next) => {
    const {type} = req.params;
    const { page, results } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(results, 10) || 10,
        sort: { createAt: -1 },
    }

    const query = {
        type: type,
        // timeEnd: { $lte: new Date() }
        // time end > time start 5p
        timeEnd: { $gte: new Date(new Date().getTime() - 5 * 60 * 60 * 1000) }
    }

    const historyBetList = await sessions.paginate(query, options);

    res.status(200).send(historyBetList);
})

module.exports = router;

