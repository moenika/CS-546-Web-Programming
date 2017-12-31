//moenika chowdhury
//lab9

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const express = require("express");
const router = express.Router();

var users =  [
  { _id: "123456789123456", username: "masterdetective123", password: "elementarymydearwatson", hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.", firstName: "Sherlock", lastName: "Holmes", profession: "Detective", bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard." },
  { _id: "543256789087654", username: "lemon", password: "damnyoujackdonaghy", hashedPassword: "$2a$06$SagJO.YW8T7c7Fzh.0VaIuYaAetQKsU2PbmI.VzzjjfWKA8yyLbQe", firstName: "Elizabeth", lastName: "Lemon", profession: "Writer", bio:"Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan." },
  { _id: "456789900876543", username: "theboywholived", password: "quidditch", hashedPassword:"$2a$06$Sm1mE0ale6vltQvfuJ0EtuLABSBQsR.8wMWjhWrzLz0QBQpIa6QL2", firstName:"Harry", lastName:"Potter", profession:"Student", bio:"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles." }
]

function findUserById(id){ //finds the user using given id in the object array, returns all properties
    return new Promise((resolve, reject) =>{
        var currentUser = users.filter(function ( obj ) {
            return obj._id === id;
        })[0];
        if (currentUser === undefined){
            return reject();
        } else {
            return resolve(currentUser);
        }
    })
}

function findUser(givenUser){
    return users.username === givenUser;
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findUserById(id).then((currentUser) =>{
        done(null, currentUser);
    });
});

function isLoggedIn(req, res ,next) {
    if (req.isAuthenticated())
        return next();
    res.sendStatus(401);
}

function comparePasswords(password, hashedPassword){ //confirms login with encrypted password
    return new Promise((resolve, reject) => {
        var result = bcrypt.compareSync(password, hashedPassword);

        if (result) {
            return resolve();
        } else{
            return reject();
        }
    });
}

function findUser(username){ //based on username instead of id number
    return new Promise((resolve, reject) =>{
        var currentUser = users.filter(function ( obj ) {
            return obj.username === username;
        })[0];
        if (currentUser === undefined){
            return reject();
        } else {
            return resolve(currentUser);
        }
    })
}

passport.use('local', new LocalStrategy( //using passport to handle logging in
    function (username, password, done) {
        findUser(username).then((currentUser) => {
            comparePasswords(password, currentUser.hashedPassword).then(() =>{
                return done(null, currentUser);
            }).catch(() => {
                return done(null, false, {"message": "Password incorrect"});
            });
        }).catch(() =>{
            return done(null, false, {"message": "User not found."});
        });
    })
);

router.get("/", (req,res) => { //loads the homepage
    if (req.isAuthenticated()){
        return res.render('layouts/private',{user: req.user});
    } else {
        var error = req.flash('error');
        res.render('layouts/login', {errors: error});
    }
});

router.get("/private", isLoggedIn, function(req, res) {
    res.render("layouts/private", {user: req.user});
});

router.post('/login', passport.authenticate('local', {
      successRedirect: "/private",
      failureRedirect: "/",
      failureFlash: true}));

module.exports = router;