const Authentication = require("../Middlewares/Authentication.middleware");
const UserModel = require("../Models/User.model");

const UserRouter = require("express").Router();

// ! GET ALL USERS ROUTE
UserRouter.get("/", async (req, res) => {
    try {
        const Users = await UserModel.find().populate({ path: "posts", select: ["user", "text", "image"] });
        // const Users = await UserModel.find().populate("posts");
        // const Users = await UserModel.find().populate("posts someotherref");
        res.status(200).json({ Message: "Here are all the Users", Users });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
// ! GET ALL USERS FRIENDS BY ID
UserRouter.get("/:id/friends", async (req, res) => {
    let id = req.params.id
    try {
        const User = await UserModel.findById({ _id: id });
        let friends = User.friends
        res.status(200).json({ Message: `Here are ${User.name}'s Friends `, friends });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
// ! POST A FRIEND REQUEST IN USERID
UserRouter.post("/:id/friends", Authentication, async (req, res) => {
    let userId = req.params.id
    let selfId = req.headers.userID
    try {
        const User = await UserModel.findById({ _id: userId });
        User.friendRequests.push(selfId)
        await UserModel.findByIdAndUpdate({ _id: userId }, User)
        res.status(200).json({ Message: `Sent a new friend request to user with ID: ${userId}`, User });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
// ! ACCEPT OR REJECT FRIEND REQUEST
UserRouter.patch("/:uid/friends/:friendId", Authentication, async (req, res) => {
    let AuthID = req.headers.userID
    let userID = req.params.uid
    if (AuthID !== userID) {
        return res.json({ Message: "Cannot Modify other users friends", })
    }
    let friendId = req.params.friendId
    let accept = req.body.accept
    try {
        const User = await UserModel.findById({ _id: userID });
        let friendRequests = User.friendRequests;
        friendRequests = friendRequests.filter((item) => item != friendId)
        let friends = User.friends
        User.friendRequests = friendRequests
        if (friends.includes(friendId)) {
            return res.status(200).json({ Message: `The User with this Friend ID is already in your friends list` });
        }
        if (accept) {
            User.friends.push(friendId)
            await UserModel.findByIdAndUpdate({ _id: userID }, User)
            res.status(201).json({ Message: `The user with id ${friendId} is now a friend of ${User.name}` });
        } else {
            await UserModel.findByIdAndUpdate({ _id: userID }, User)
            res.status(201).json({ Message: `You have rejected the friend request with id : ${friendId}` });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});


module.exports = UserRouter;