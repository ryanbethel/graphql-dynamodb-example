const DB_MAP = {
    USER: {
        get: ({ userId }) => ({
            pk: userId,
            sk: "#",
        }),
        put: ({ userId, teamId, userName }) => ({
            pk: userId,
            sk: "#",
            gsi1pk: "User",
            gsi1sk: userName,
            gsi2pk: teamId,
            _tp: "User",
            un: userName,
        }),
        parse: ({ pk, gsi2pk, un, _tp }) => {
            if ((_tp = "User")) {
                return {
                    id: pk,
                    team: { id: gsi2pk },
                    name: un,
                };
            } else return null;
        },
        queryByName: ({ userName }) => ({
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk", "#s": "gsi1sk" },
            KeyConditionExpression: "#p = :p and #s = :s)",
            ExpressionAttributeValues: { ":p": "User", ":s": userName },
            ScanIndexForward: true,
        }),
        queryByTeamId: ({ teamId }) => ({
            IndexName: "gsi2pk-gsi2sk-index",
            ExpressionAttributeNames: { "#p": "gsi2pk" },
            KeyConditionExpression: "#p = :p ",
            ExpressionAttributeValues: { ":p": teamId },
            ScanIndexForward: true,
        }),
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk" },
            KeyConditionExpression: "#p = :p ",
            ExpressionAttributeValues: { ":p": "User" },
            ScanIndexForward: true,
        },
    },
    TEAM: {
        get: ({ teamId }) => ({
            pk: teamId,
            sk: "#",
        }),
        put: ({ teamId, teamName }) => ({
            pk: teamId,
            sk: "#",
            gsi1pk: "Team",
            gsi1sk: teamName,
            _tp: "Team",
            tn: teamName,
        }),
        parse: ({ pk, tn, _tp }) => {
            if ((_tp = "Team")) {
                return {
                    id: pk,
                    name: tn,
                };
            } else return null;
        },
        queryByName: ({ teamName }) => ({
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk", "#s": "gsi1sk" },
            KeyConditionExpression: "#p = :p AND #s = :s",
            ExpressionAttributeValues: { ":p": "Team", ":s": teamName },
            ScanIndexForward: true,
        }),
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk" },
            KeyConditionExpression: "#p = :p ",
            ExpressionAttributeValues: { ":p": "Team" },
            ScanIndexForward: true,
        },
    },
    CERTIFICATION: {
        get: ({ certificationId }) => ({
            pk: certificationId,
            sk: "#",
        }),
        put: ({ certificationId, certificationName }) => ({
            pk: certificationId,
            sk: "#",
            gsi1pk: "Certification",
            gsi1sk: certificationName,
            _tp: "Certification",
            cn: certificationName,
        }),
        parse: ({ pk, cn, _tp }) => {
            if ((_tp = "Certification")) {
                return {
                    id: pk,
                    name: cn,
                };
            } else return null;
        },
        queryByName: ({ certificationName }) => ({
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk", "#s": "gsi1sk" },
            KeyConditionExpression: "#p = :p and #s = :s",
            ExpressionAttributeValues: { ":p": "Certification", ":s": certificationName },
            ScanIndexForward: true,
        }),
        queryAll: {
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk" },
            KeyConditionExpression: "#p = :p ",
            ExpressionAttributeValues: { ":p": "Certification" },
            ScanIndexForward: true,
        },
    },
    CREDENTIAL: {
        get: ({ certificationId, userId }) => ({
            pk: userId,
            sk: certificationId,
        }),
        put: ({ certificationId, userId, certificationName, userName, expiration }) => ({
            pk: userId,
            sk: certificationId,
            gsi1pk: certificationId,
            gsi1sk: userId,
            _tp: "Credential",
            cn: certificationName,
            un: userName,
            exp: expiration,
        }),
        parse: ({ pk, sk, cn, un, exp, _tp }) => {
            if ((_tp = "Credential")) {
                return {
                    id: pk + "_" + sk,
                    user: { id: pk, name: un },
                    certification: { id: sk, name: cn },
                    expiration: exp,
                };
            } else return null;
        },
        queryByUserId: ({ userId }) => ({
            ExpressionAttributeNames: { "#p": "pk", "#s": "sk" },
            KeyConditionExpression: "#p = :p and begins_with(#s,:s) ",
            ExpressionAttributeValues: { ":p": userId, ":s": "C_" },
            ScanIndexForward: true,
        }),
    },
    parseList: (list, type) => {
        if (Array.isArray(list)) {
            return list.map((i) => DB_MAP[type].parse(i));
        }
        if (Array.isArray(list.Items)) {
            return list.Items.map((i) => DB_MAP[type].parse(i));
        }
    },
};

module.exports = { DB_MAP };
