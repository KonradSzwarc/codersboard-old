const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../../utils/validate');

const createUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  args.data.password = await bcrypt.hash(args.data.password, 10);
  return ctx.prisma.mutation.createUser(args, info);
};

const updateUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  return ctx.prisma.mutation.updateUser(args, info);
};

const deleteUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  return ctx.prisma.mutation.deleteUser(args, info);
};

const signIn = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.prisma.query.user({ where: { email } }, '{id permissions password special}');

  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    // In case of the first owner user
    if (user.permissions.includes('OWNER') && user.special.includes('DB_USER') && user.password === password) {
      password = await bcrypt.hash(password, 10);
      const special = user.special.filter(key => key !== 'DB_USER');
      await ctx.prisma.mutation.updateUser({ where: { id: user.id }, data: { password, special: { set: special } } }, info);
    } else {
      throw new Error('Invalid Password!');
    }
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return user;
};

const signOut = (parent, args, ctx, info) => {
  ctx.response.clearCookie('token');
  return { message: 'Logged out' };
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  signIn,
  signOut,
}