
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
    mutation: {
    //login: accepts an email and password as parameters, returns an auth type
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("No User found, please try again")
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("incorrect password, please try again")
        } 
        const token = signToken(user);
        return { token, user };
      },
    //addUser: accepts a username, email, and password as parameters, returns an Auth type;
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },
    //saveBook: accepts a book auther's array, description, title, bookID, image, and link as parameters; 
        //returns a user type
        saveBook: async (parent, args, context) => {
            if (context.user) {
              const Userupdate = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: args.input} },
                { new: true }
              );
      
              return Userupdate;
            }
      
            throw new AuthenticationError('Please sign in');
          },
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
}