const validate = require('utils/validate');

const createEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  console.log(args);

  const userIds = args.data.attendees.connect.map(({ id }) => id);
  args.data.attendees = [];

  const event = await ctx.prisma.mutation.createEvent(args, '{ id }');

  for (const userId of userIds) {
    ctx.prisma.mutation.createAttendee({
      data: {
        event: { connect: { id: event.id } },
        user: { connect: { id: userId } },
      }
    });
  }

  return ctx.prisma.query.event({ where: { id: event.id } }, info);
};

const updateEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.updateEvent(args, info);
};

const deleteEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);

  const event = await ctx.prisma.query.event(args, '{ attendees { id } }');

  for (const attendee of event.attendees) {
    await ctx.prisma.mutation.deleteAttendee({ where: { id: attendee.id } });
  }

  return ctx.prisma.mutation.deleteEvent(args, info);
};

const attendEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();

  if (args.attendeeId) {
    await ctx.prisma.mutation.updateAttendee({
      where: {
        id: args.attendeeId,
      },
      data: {
        status: 'YES',
      },
    });
  } else {
    await ctx.prisma.mutation.createAttendee({
      data: {
        user: { connect: { id: ctx.request.userId } },
        event: { connect: { id: args.eventId } },
        status: 'YES',
      },
    });
  }

  return { message: 'ATTEND' };
};

const neglectEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  await ctx.prisma.mutation.updateAttendee({
    where: {
      id: args.attendeeId,
    },
    data: {
      status: 'NO',
    },
  });

  return { message: 'NEGLECT' };
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  neglectEvent,
};
