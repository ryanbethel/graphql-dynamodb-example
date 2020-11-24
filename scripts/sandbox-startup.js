const arc = require("@architect/functions");
const { DB_MAP } = require("../src/http/post-graphql/entity-maps");

const teams = [{ pk: "T-001", sk: "#", gsi1pk: "T", gsi1sk: "Team One", tn: "Team One", _tp: "T" }];
const users = [
    {
        pk: "U-001",
        sk: "#",
        gsi1pk: "U",
        gsi1sk: "John Smith",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "John Smith",
        _tp: "U",
    },
    { pk: "U-002", sk: "#", gsi1pk: "U", gsi1sk: "Jane Doe", gsi2pk: "T-001", gsi2sk: "#", un: "Jane Doe", _tp: "U" },
    { pk: "U-003", sk: "#", gsi1pk: "U", gsi1sk: "John Doe", gsi2pk: "T-001", gsi2sk: "#", un: "John Doe", _tp: "U" },
    {
        pk: "U-004",
        sk: "#",
        gsi1pk: "U",
        gsi1sk: "Jane Smith",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "Jane Smith",
        _tp: "U",
    },
];
const certs = [
    { pk: "C-001", sk: "#", gsi1pk: "C", gsi2pk: "Rock Certification", cn: "Rock Certification", _tp: "C" },
    { pk: "C-002", sk: "#", gsi1pk: "C", gsi2pk: "Hiking Certification", cn: "Hiking Certification", _tp: "C" },
];
const creds = [
    {
        pk: "U-001",
        sk: "C-001",
        gsi1pk: "C-001",
        gsi2pk: "U-001",
        cn: "Rock Certification",
        un: "John Smith",
        exp: "June,2021",
        _tp: "CD",
    },
    {
        pk: "U-001",
        sk: "C-002",
        gsi1pk: "C-002",
        gsi2pk: "U-001",
        cn: "Hiking Certification",
        un: "John Smith",
        exp: "April,2022",
        _tp: "CD",
    },
];

async function startUpScript() {
    const data = await arc.tables();

    for (item of [...teams, ...users, ...certs, ...creds]) {
        await data.singletable.put(item);
    }

    console.log("startup script run");
}

module.exports = startUpScript;
