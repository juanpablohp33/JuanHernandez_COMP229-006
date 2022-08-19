let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let foodController = require('../controllers/food');

// helper function for guard purposes
/*function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.sendStatus(401)
    }
    next();
}*/

/* GET Route for the food List page - READ Operation */
router.get('/', passport.authenticate('jwt', { session: false }), foodController.displayFoodList);

/* GET Route for displaying the Add page - CREATE Operation */
//router.get('/add', requireAuth, foodController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', passport.authenticate('jwt', { session: false }), foodController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
// router.get('/edit/:id', requireAuth, foodController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
// router.post('/edit/:id', requireAuth, foodController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), foodController.performDelete);

module.exports = router;