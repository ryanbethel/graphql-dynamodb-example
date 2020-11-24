//Map parameters for DynamoDb single table items
//
let DB_MAP = {
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
                gsi1pk: "U",
                gsi1sk: userName,
                gsi2pk: teamId,
                _tp: "U",
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
            if ((_tp = "U")) {
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
                ExpressionAttributeValues: { ":gsi1pk": "U", ":gsi1sk": userName },
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
            ExpressionAttributeValues: { ":gsi1pk": "U" },
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
                gsi1pk: "T",
                gsi1sk: teamName,
                _tp: "T",
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
            if ((_tp = "T")) {
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
                ExpressionAttributeValues: { ":gsi1pk": "T", ":gsi1sk": teamName },
                ScanIndexForward: true,
            };
        },
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#gsi1pk": "gsi1pk" },
            KeyConditionExpression: "#gsi1pk = :gsi1pk ",
            ExpressionAttributeValues: { ":gsi1pk": "T" },
            ScanIndexForward: true,
        },
    },
    CERT: {
        get: ({ certId }) => {
            return {
                pk: certId,
                sk: "#",
            };
        },
        put: ({ certId, certName }) => {
            return {
                pk: certId,
                sk: "#",
                gsi1pk: "C",
                gsi1sk: certName,
                _tp: "C",
                cn: certName,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.CERT.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.CERT.parse(i));
            }
        },
        parse: ({ pk, cn, _tp }) => {
            if ((_tp = "C")) {
                return {
                    id: pk,
                    name: cn,
                };
            } else return null;
        },
        queryByName: ({ certName }) => {
            return {
                IndexName: "gsi1pk-gsi1sk-index",
                ExpressionAttributeNames: { "#gsi1pk": "gsi1pk", "#gsi1sk": "gsi1sk" },
                KeyConditionExpression: "#gsi1pk = :gsi1pk and #gsi1sk = :gsi1sk",
                ExpressionAttributeValues: { ":gsi1pk": "C", ":gsi1sk": certName },
                ScanIndexForward: true,
            };
        },
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#gsi1pk": "gsi1pk" },
            KeyConditionExpression: "#gsi1pk = :gsi1pk ",
            ExpressionAttributeValues: { ":gsi1pk": "C" },
            ScanIndexForward: true,
        },
    },
    CRED: {
        get: ({ certId, userId }) => {
            return {
                pk: userId,
                sk: certId,
            };
        },
        put: ({ certId, userId, certName, userName, expiration }) => {
            return {
                pk: userId,
                sk: certId,
                gsi1pk: certId,
                gsi1sk: userId,
                _tp: "CD",
                cn: certName,
                un: userName,
                exp: expiration,
            };
        },
        parseList: (list) => {
            if (Array.isArray(list)) {
                return list.map((i) => DB_MAP.CRED.parse(i));
            }
            if (Array.isArray(list.Items)) {
                return list.Items.map((i) => DB_MAP.CRED.parse(i));
            }
        },
        parse: ({ pk, sk, cn, un, exp, _tp }) => {
            if ((_tp = "CD")) {
                return {
                    id: pk + sk,
                    user: { id: pk, name: un },
                    cert: { id: sk, name: cn },
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
