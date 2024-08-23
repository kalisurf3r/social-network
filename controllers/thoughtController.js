const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {

// * get all thoughts
async getAllThoughts (req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * get a thought by id
async getThoughtById (req, res) {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * create a new thought
async createThought (req, res) {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * update a thought by id
async updateThought (req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * delete a thought by id
async deleteThought (req, res) {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * add a reaction to a thought
async addReaction (req, res) {
    try {
        const newThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true });
        res.json(newThought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

// * delete a reaction from a thought
async deleteReaction (req, res) {
    try {
        const removedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: req.body } }, { new: true });
        res.json(removedThought);
    } catch (err) {
        res.status(400).json(err);
    }
}
}