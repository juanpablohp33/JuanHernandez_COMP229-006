let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Food = require('../models/food');

module.exports.displayFoodList = (req, res, next) => {
    Food.find((err, foodList) => {
        if (err) {
            return console.error(err);
        } else {
            //res.render('food/list',
            //{title: 'foods',
            //foodList: foodList,
            //displayName: req.user ? req.user.displayName : ''});
            // console.log(foodList);

            res.json(foodList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    /*
    res.render('food/add', {title: 'Add food', 
    displayName: req.user ? req.user.displayName : ''});
    */

    res.json({ success: true, msg: 'Succesfully Displayed Add Page' });
}

module.exports.processAddPage = (req, res, next) => {
    let newFood = Food({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Food.create(newFood, (err, Food) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the food list
            //res.redirect('/food-list');

            res.json({ success: true, msg: 'Successfully Added New Food' });
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Food.findById(id, (err, foodToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            /*
            res.render('food/edit', {title: 'Edit Food', food: foodToEdit, 
            displayName: req.user ? req.user.displayName : ''});
            */

            res.json({ success: true, msg: 'Successfully Displayed Food to Edit', food: foodToEdit });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedFood = Food({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Food.updateOne({ _id: id }, updatedFood, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the food list
            //res.redirect('/food-list');

            res.json({ success: true, msg: 'Successfully Edited Food', food: updatedFood });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Food.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the food list
            //res.redirect('/food-list');

            res.json({ success: true, msg: 'Successfully Deleted Food' });
        }
    });
}