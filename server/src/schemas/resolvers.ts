import { User } from '../models/index.js';
import { AuthenticationError, signToken } from '../services/auth.js';
import type { BookDocument } from '../models/Book.js';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: BookDocument[];
}
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}
interface SaveBookArgs {
   input: BookDocument[];
}
interface RemoveBookArgs {
    bookId: string;
}
interface Context {
    user?: User;
}

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOne({
                    $or: [{ _id: context.user._id }, { username: context.user.username }] 
                });
            }
            throw new AuthenticationError('Not Authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent: unknown, { input }: AddUserArgs): Promise<{ token: string, user: User }> => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        login: async (_parent: unknown, { username, email, password }: {username: string, email: string, password: string}): Promise<{ token: string, user: User }> => {
            const user = await User.findOne({
                $or: [{ username: username }, { email: email }]
            });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Not Authenticated');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: unknown, { input }: SaveBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { runValidators: true, new: true }
                );
            }
            throw new AuthenticationError('Could not find user');
        },

        removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError('Could not find user');
        }
    }
}

export default resolvers;