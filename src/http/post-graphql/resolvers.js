const arc = require("@architect/functions");
const { DB_MAP } = require("./entity-maps");

const resolverMap = {
    Query: {
        team: async (root, args, ctx, info) => {
            if (args.id) {
                const team = await ctx.db.singletable.get(DB_MAP.TEAM.get({ teamId: args.id }));
                return DB_MAP.TEAM.parse(team);
            } else if (args.name) {
                const team = await ctx.db.singletable.query(DB_MAP.TEAM.queryByName({ teamName: args.name }));
                return DB_MAP.TEAM.parseList(team)[0];
            }
        },
        user: async (root, args, ctx, info) => {
            if (args.id) {
                const user = await ctx.db.singletable.get(DB_MAP.USER.get({ userId: args.id }));
                return DB_MAP.USER.parse(user);
            } else if (args.name) {
                const user = await ctx.db.singletable.query(DB_MAP.USER.queryByName({ userName: args.name }));
                return DB_MAP.USER.parseList(user)[0];
            }
        },
        cert: async (root, args, ctx, info) => {
            if (args.id) {
                const cert = await ctx.db.singletable.get(DB_MAP.CERT.get({ certId: args.id }));
                return DB_MAP.CERT.parse(cert);
            } else if (args.name) {
                const cert = await ctx.db.singletable.query(DB_MAP.CERT.queryByName({ certName: attr.name }));
                return DB_MAP.TEAM.parseList(cert)[0];
            }
        },
        allTeams: async (root, args, ctx, info) => {
            const teams = await ctx.db.singletable.query(DB_MAP.TEAM.queryAll);
            return DB_MAP.TEAM.parseList(teams);
        },
        allCerts: async (root, args, ctx, info) => {
            const certs = await ctx.db.singletable.query(DB_MAP.CERT.queryAll);
            return DB_MAP.CERT.parseList(certs);
        },
        allUsers: async (root, args, ctx, info) => {
            const users = await ctx.db.singletable.query(DB_MAP.USER.queryAll);
            return DB_MAP.USER.parseList(users);
        },
    },
    Team: {
        name: async (root, _, ctx) => {
            if (root.name) {
                return root.name;
            } else {
                const team = await ctx.db.singletable.get(DB_MAP.TEAM.get({ teamId: root.id }));
                return DB_MAP.TEAM.parse(team).name;
            }
        },
        members: async (root, _, ctx) => {
            const members = await ctx.db.singletable.query(DB_MAP.USER.queryByTeamId({ teamId: root.id }));
            return await DB_MAP.USER.parseList(members);
        },
    },
    User: {
        name: async (root, _, ctx) => {
            if (root.name) {
                return root.name;
            } else {
                const user = await ctx.db.singletable.get(DB_MAP.USER.get({ userId: root.id }));
                return DB_MAP.USER.parse(user).name;
            }
        },
        credentials: async (root, _, ctx) => {
            const credentials = await ctx.db.singletable.query(DB_MAP.CRED.queryByUserId({ userId: root.id }));
            return DB_MAP.CRED.parseList(credentials);
        },
    },
};

module.exports = { resolverMap };
