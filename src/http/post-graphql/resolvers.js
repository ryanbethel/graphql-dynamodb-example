const { DB_MAP } = require("./entity-maps");

const resolverMap = {
    Query: {
        team: (root, args, ctx, info) => {
            return ctx.db.singletable.get(DB_MAP.TEAM.get({ teamId: args.id })).then((data) => DB_MAP.TEAM.parse(data));
        },
        teamByName: (root, args, ctx, info) => {
            return ctx.db.singletable
                .query(DB_MAP.TEAM.queryByName({ teamName: args.name }))
                .then((data) => DB_MAP.parseList(data, "TEAM"));
        },
        user: (root, args, ctx, info) => {
            return ctx.db.singletable.get(DB_MAP.USER.get({ userId: args.id })).then((data) => DB_MAP.USER.parse(data));
        },
        userByName: (root, args, ctx, info) => {
            return ctx.db.singletable
                .query(DB_MAP.USER.queryByName({ userName: args.name }))
                .then((data) => DB_MAP.parseList(data, "USER"));
        },
        certification: (root, args, ctx, info) => {
            return ctx.db.singletable
                .get(DB_MAP.CERTIFICATION.get({ certificationId: args.id }))
                .then((data) => DB_MAP.CERTIFICATION.parse(data));
        },
        certificationByName: (root, args, ctx, info) => {
            return ctx.db.singletable
                .query(DB_MAP.CERTIFICATION.queryByName({ certificationName: args.name }))
                .then((data) => DB_MAP.parseList(data, "CERTIFICATION"));
        },
        allTeams: (root, args, ctx, info) => {
            return ctx.db.singletable.query(DB_MAP.TEAM.queryAll).then((data) => DB_MAP.parseList(data, "TEAM"));
        },
        allCertifications: (root, args, ctx, info) => {
            return ctx.db.singletable
                .query(DB_MAP.CERTIFICATION.queryAll)
                .then((data) => DB_MAP.parseList(data, "CERTIFICATION"));
        },
        allUsers: (root, args, ctx, info) => {
            return ctx.db.singletable.query(DB_MAP.USER.queryAll).then((data) => DB_MAP.parseList(data, "USER"));
        },
    },
    Team: {
        name: (root, _, ctx) => {
            if (root.name) {
                return root.name;
            } else {
                return ctx.db.singletable
                    .get(DB_MAP.TEAM.get({ teamId: root.id }))
                    .then((data) => DB_MAP.TEAM.parse(data).name);
            }
        },
        members: (root, _, ctx) => {
            return ctx.db.singletable
                .query(DB_MAP.USER.queryByTeamId({ teamId: root.id }))
                .then((data) => DB_MAP.parseList(data, "USER"));
        },
    },
    User: {
        name: (root, _, ctx) => {
            if (root.name) {
                return root.name;
            } else {
                return ctx.db.singletable
                    .get(DB_MAP.USER.get({ userId: root.id }))
                    .then((data) => DB_MAP.USER.parse(data).name);
            }
        },
        credentials: (root, _, ctx) => {
            return ctx.db.singletable
                .query(DB_MAP.CREDENTIAL.queryByUserId({ userId: root.id }))
                .then((data) => DB_MAP.parseList(data, "CREDENTIAL"));
        },
    },
};

module.exports = { resolverMap };
