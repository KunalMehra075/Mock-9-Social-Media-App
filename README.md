# Social Media App :-

- This is a Social Media App which allows users to Login & Signup And make a Post.
- It also allows user to Like a Post, Comment on A post, Delete a Post.
- This App is build using Node.js, Express.js, and MongoDB (NEM) as the backend stack.

# Overview of all the routes :-

| METHOD | ENDPOINT                         | DESCRIPTION                                                                                                       | STATUS CODE |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| POST   | /api/register                    | This endpoint allows users to register. Hash the password on store.                                               | 201         |
| GET    | /api/users                       | This endpoint returns a list of all registered users.                                                             | 200         |
| GET    | /api/users/:id/friends           | This endpoint returns a list of all friends of a specific user identified by its ID.                              | 200         |
| POST   | /api/users/:id/friends           | This endpoint allows the user to send a friend request to another user identified by its ID.                      | 201         |
| PATCH  | /api/users/:id/friends/:friendId | This endpoint allows users to accept or reject friend requests sent to them by another user identified by its ID. | 204         |
| GET    | /api/posts                       | This endpoint returns a list of all posts.                                                                        | 200         |
| POST   | /api/posts                       | This endpoint allows the user to create a new post.                                                               | 201         |
| PATCH  | /api/posts/:id                   | This endpoint allows users to update the text or image of a specific post identified by its ID.                   | 204         |
| DELETE | /api/posts/:id                   | This endpoint allows users to delete a specific post identified by its ID.                                        | 202         |
| POST   | /api/posts/:id/like              | This endpoint allows users to like a specific post identified by its ID.                                          | 201         |
| POST   | /api/posts/:id/comment           | This endpoint allows users to comment on a specific post identified by its ID.                                    | 201         |
| GET    | /api/posts/:id                   | This endpoint returns the details of a specific post identified by its ID.                                        | 200         |

# The Models Used in Creation of Database :-

## User Model :-

- The blue print of an instance of how a user gets saved in the database

```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}

```

## Post model :-

- The blue print of an instance of how a Post gets saved in the database

```
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}

```

# All the Routes in Details :-
