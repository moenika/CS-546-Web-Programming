//moenika chowdhury

const palindromeRoutes = require("./palindromes");
const constructorMethod = (app) => {
    app.use("/", palindromeRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Can't find route ~"});
    });
};

module.exports = constructorMethod;