const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {

// * get all users
async getAllUsers (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * get a user by id
async getUserById (req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * create a new user
async createUser (req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * update a user by id
async updateUser (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body , { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
},

// * delete a user by id
async deleteUser (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const thoughts = await Thought.deleteMany({ username: user.username });
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * add a friend to a user's friend list
async addFriend (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendsId } }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * remove a friend from a user's friend list
async removeFriend (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendsId } }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
 } 
}