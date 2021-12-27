const express = require('express');
const Member = require('../models/Member')

const router = express.Router();
const MEMBERS = []

router.get('/', (req, res) => {
    res.json({ members: MEMBERS.map(i => i.getFields()) })
})

router.post('/add', (req, res) => {
    const model = new Member(req.body.name, req.body.email)
    if (model.validate(MEMBERS)) {
        MEMBERS.push(model)

        res.status(201).json({ model: model.getFields() })
        return
    }

    res.status(500).json({ errors: model.getErrors() })
})

module.exports = router;