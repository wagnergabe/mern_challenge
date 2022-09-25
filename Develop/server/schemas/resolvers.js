
const { User } = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: { 
      me: async (parent, args, context) => {
        if (context.user) {
          const foundUser = await User.findOne
          ({ _id: context.user._id })
          .select("-__v -password")
          return foundUser;
        }
        throw new AuthenticationError("Need to be logged in!")
      }
    },
    mutation: 
    //login: accepts an email and password as parameters, returns an auth type
    //addUser: accepts a username, email, and password as parameters, returns an Auth type;
    //saveBook: accepts a book auther's array, description, title, bookID, image, and link as parameters; 
        //returns a user type
    //removeBook: accepts a book's bookID as a parameters; returns a User Type
    //User type:
        //_id
        //-username
        //email
        //bookCount
        //savedBooks(This will be an array of the Book type.)
    //Book type:
        //bookId(Not the _id, but the book's id value returned rom groogle's book api)
        //authors(An array of srings, as there may be more than one aurther)
        //description
        //title
        //image
        //link

    //Auth type:
        //token
        //user(Reerences the user type)
}