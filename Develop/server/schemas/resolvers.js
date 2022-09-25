
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
    }
}