//moenika chowdhury

const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.render('layouts/main');
});

module.exports = router;    