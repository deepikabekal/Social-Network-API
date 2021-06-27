const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require ('../../controllers/thought-controller');

//set up GET and POST routes at /api/thoughts
router
.route ('/')
.get (getAllThoughts)
.post (createThought);

//set up GET one, PUT and DELETE routes at /api/thoughts/:id
router
.route ('/:id')
.get (getThoughtById)
.put (updateThought)
.delete (removeThought);

//set POST routes at /api/thoughts/:thoughtId/reactions
router
.route ('/:thoughtId/reactions')
.post (createReaction);

//set DELETE routes at /api/thoughts/:thoughtId/reactions/:reactionId
router
.route ('/:thoughtId/reactions/:reactionId')
.delete (removeReaction);

module.exports = router;