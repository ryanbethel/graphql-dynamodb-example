const DB_MAP = {
    USER: {
        get: ({ userId }) => ({
            pk: "U#" + userId,
            sk: "#",
        }),
        put: ({ userId, teamId, userName }) => ({
            pk: "U#" + userId,
            sk: "#",
            gsi1pk: "User",
            gsi1sk: userName,
            gsi2pk: "T#" + teamId,
            gsi2sk: "#",
            _tp: "User",
            un: userName,
        }),
        parse: ({ pk, gsi2pk, un, _tp }) => {
            if (_tp === "User") {
                return {
                    id: pk.slice(2),
                    team: { id: gsi2pk.slice(2) },
                    name: un,
                };
            } else return null;
        },
        queryByName: ({ userName }) => ({
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk", "#s": "gsi1sk" },
            KeyConditionExpression: "#p = :p and #s = :s",
            ExpressionAttributeValues: { ":p": "User", ":s": userName },
            ScanIndexForward: true,
        }),
        queryByTeamId: ({ teamId }) => ({
            IndexName: "gsi2pk-gsi2sk-index",
            ExpressionAttributeNames: { "#p": "gsi2pk" },
            KeyConditionExpression: "#p = :p ",
            ExpressionAttributeValues: { ":p": "T#" + teamId },
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
            pk: "T#" + teamId,
            sk: "#",
        }),
        put: ({ teamId, teamName }) => ({
            pk: "T#" + teamId,
            sk: "#",
            gsi1pk: "Team",
            gsi1sk: teamName,
            _tp: "Team",
            tn: teamName,
        }),
        parse: ({ pk, tn, _tp }) => {
            if (_tp === "Team") {
                return {
                    id: pk.slice(2),
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
            pk: "C#" + certificationId,
            sk: "#",
        }),
        put: ({ certificationId, certificationName }) => ({
            pk: "C#" + certificationId,
            sk: "#",
            gsi1pk: "Certification",
            gsi1sk: certificationName,
            _tp: "Certification",
            cn: certificationName,
        }),
        parse: ({ pk, cn, _tp }) => {
            if (_tp === "Certification") {
                return {
                    id: pk.slice(2),
                    name: cn,
                };
            } else return null;
        },
        queryByName: ({ certificationName }) => ({
            IndexName: "gsi1pk-gsi1sk-index",
            ExpressionAttributeNames: { "#p": "gsi1pk", "#s": "gsi1sk" },
            KeyConditionExpression: "#p = :p AND #s = :s",
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
            pk: "U#" + userId,
            sk: "C#" + certificationId,
        }),
        put: ({ certificationId, userId, certificationName, userName, expiration }) => ({
            pk: "U#" + userId,
            sk: "C#" + certificationId,
            gsi1pk: "C#" + certificationId,
            gsi1sk: "U#" + userId,
            _tp: "Credential",
            cn: certificationName,
            un: userName,
            exp: expiration,
        }),
        parse: ({ pk, sk, cn, un, exp, _tp }) => {
            if (_tp === "Credential") {
                return {
                    id: pk.slice(2) + "_" + sk.slice(2),
                    user: { id: pk.slice(2), name: un },
                    certification: { id: sk.slice(2), name: cn },
                    expiration: exp,
                };
            } else return null;
        },
        queryByUserId: ({ userId }) => ({
            ExpressionAttributeNames: { "#p": "pk", "#s": "sk" },
            KeyConditionExpression: "#p = :p and begins_with(#s,:s) ",
            ExpressionAttributeValues: { ":p": "U#" + userId, ":s": "C#" },
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
