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
        const reaction = await Reaction.create(req.body);
        await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: reaction._id } }, { new: true });
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
    }
},

// * delete a reaction from a thought
async deleteReaction (req, res) {
    try {
        await Reaction.findByIdAndDelete(req.params.reactionId);
        await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: ObjectId(req.params.reactionId) } }, { new: true });
        res.json({ message: 'Reaction deleted!' });
    } catch (err) {
        res.status(400).json(err);
    }
}
}