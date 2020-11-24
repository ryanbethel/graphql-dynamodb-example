const DB_MAP = {
    USER: {
        get: ({ userId }) => {
            return {
                pk: userId,
                sk: "#",
            };
        },
        put: ({ userId, teamId, userName }) => {
            return {
                pk: userId,
                sk: "#",
                gsi1pk: "User",
                gsi1sk: userName,
                gsi2pk: teamId,
                _tp: "User",
                un: userName,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.USER.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.USER.parse(i));
            }
        },
        parse: ({ pk, gsi2pk, un, _tp }) => {
            if ((_tp = "User")) {
                return {
                    id: pk,
                    team: { id: gsi2pk },
                    name: un,
                };
            } else return null;
        },
        queryByName: ({ userName }) => {
            return {
                IndexName: "gsi1pk-gsi1sk-index",
                ExpressionAttributeNames: { "#gsi1pk": "gsi1pk", "#gsi1sk": "gsi1sk" },
                KeyConditionExpression: "#gsi1pk = :gsi1pk and #gsi1sk = :gsi1sk)",
                ExpressionAttributeValues: { ":gsi1pk": "User", ":gsi1sk": userName },
                ScanIndexForward: true,
            };
        },
        queryByTeamId: ({ teamId }) => {
            return {
                IndexName: "gsi2pk-gsi2sk-index",
                ExpressionAttributeNames: { "#gsi2pk": "gsi2pk" },
                KeyConditionExpression: "#gsi2pk = :gsi2pk ",
                ExpressionAttributeValues: { ":gsi2pk": teamId },
                ScanIndexForward: true,
            };
        },
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#gsi1pk": "gsi1pk" },
            KeyConditionExpression: "#gsi1pk = :gsi1pk ",
            ExpressionAttributeValues: { ":gsi1pk": "User" },
            ScanIndexForward: true,
        },
    },
    TEAM: {
        get: ({ teamId }) => {
            return {
                pk: teamId,
                sk: "#",
            };
        },
        put: ({ teamId, teamName }) => {
            return {
                pk: teamId,
                sk: "#",
                gsi1pk: "Team",
                gsi1sk: teamName,
                _tp: "Team",
                tn: teamName,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.TEAM.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.TEAM.parse(i));
            }
        },
        parse: ({ pk, tn, _tp }) => {
            if ((_tp = "Team")) {
                return {
                    id: pk,
                    name: tn,
                };
            } else return null;
        },
        queryByName: ({ teamName }) => {
            return {
                IndexName: "gsi1pk-gsi1sk-index",
                ExpressionAttributeNames: { "#gsi1pk": "gsi1pk", "#gsi1sk": "gsi1sk" },
                KeyConditionExpression: "#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk",
                ExpressionAttributeValues: { ":gsi1pk": "Team", ":gsi1sk": teamName },
                ScanIndexForward: true,
            };
        },
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#gsi1pk": "gsi1pk" },
            KeyConditionExpression: "#gsi1pk = :gsi1pk ",
            ExpressionAttributeValues: { ":gsi1pk": "Team" },
            ScanIndexForward: true,
        },
    },
    CERTIFICATION: {
        get: ({ certificationId }) => {
            return {
                pk: certificationId,
                sk: "#",
            };
        },
        put: ({ certificationId, certificationName }) => {
            return {
                pk: certificationId,
                sk: "#",
                gsi1pk: "Certification",
                gsi1sk: certificationName,
                _tp: "Certification",
                cn: certificationName,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.CERTIFICATION.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.CERTIFICATION.parse(i));
            }
        },
        parse: ({ pk, cn, _tp }) => {
            if ((_tp = "Certification")) {
                return {
                    id: pk,
                    name: cn,
                };
            } else return null;
        },
        queryByName: ({ certificationName }) => {
            return {
                IndexName: "gsi1pk-gsi1sk-index",
                ExpressionAttributeNames: { "#gsi1pk": "gsi1pk", "#gsi1sk": "gsi1sk" },
                KeyConditionExpression: "#gsi1pk = :gsi1pk and #gsi1sk = :gsi1sk",
                ExpressionAttributeValues: { ":gsi1pk": "Certification", ":gsi1sk": certificationName },
                ScanIndexForward: true,
            };
        },
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#gsi1pk": "gsi1pk" },
            KeyConditionExpression: "#gsi1pk = :gsi1pk ",
            ExpressionAttributeValues: { ":gsi1pk": "Certification" },
            ScanIndexForward: true,
        },
    },
    CREDENTIAL: {
        get: ({ certificationId, userId }) => {
            return {
                pk: userId,
                sk: certificationId,
            };
        },
        put: ({ certificationId, userId, certificationName, userName, expiration }) => {
            return {
                pk: userId,
                sk: certificationId,
                gsi1pk: certificationId,
                gsi1sk: userId,
                _tp: "Credential",
                cn: certificationName,
                un: userName,
                exp: expiration,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.CREDENTIAL.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.CREDENTIAL.parse(i));
            }
        },
        parse: ({ pk, sk, cn, un, exp, _tp }) => {
            if ((_tp = "Credential")) {
                return {
                    id: pk + sk,
                    user: { id: pk, name: un },
                    certification: { id: sk, name: cn },
                    expiration: exp,
                };
            } else return null;
        },
        queryByUserId: ({ userId }) => {
            return {
                ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
                KeyConditionExpression: "#pk = :pk and begins_with(#sk,:sk) ",
                ExpressionAttributeValues: { ":pk": userId, ":sk": "C-" },
                ScanIndexForward: true,
            };
        },
    },
};

module.exports = { DB_MAP };
