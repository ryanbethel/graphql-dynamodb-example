const arc = require("@architect/functions");
const { DB_MAP } = require("../src/http/post-graphql/entity-maps");

const teams = [
    {
        pk: "T-001",
        sk: "#",
        gsi1pk: "Team",
        gsi1sk: "Team One",
        tn: "Team One",
        _tp: "Team",
    },
];
const users = [
    {
        pk: "U-001",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Smith",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "John Smith",
        _tp: "User",
    },
    {
        pk: "U-002",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Doe",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "Jane Doe",
        _tp: "User",
    },
    {
        pk: "U-003",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Doe",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "John Doe",
        _tp: "User",
    },
    {
        pk: "U-004",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Smith",
        gsi2pk: "T-001",
        gsi2sk: "#",
        un: "Jane Smith",
        _tp: "User",
    },
];
const certifications = [
    {
        pk: "C-001",
        sk: "#",
        gsi1pk: "Certification",
        gsi2pk: "Rock Certification",
        cn: "Rock Certification",
        _tp: "Certification",
    },
    {
        pk: "C-002",
        sk: "#",
        gsi1pk: "Certification",
        gsi2pk: "Hiking Certification",
        cn: "Hiking Certification",
        _tp: "Certification",
    },
];
const credentials = [
    {
        pk: "U-001",
        sk: "C-001",
        gsi1pk: "C-001",
        gsi2pk: "U-001",
        cn: "Rock Certification",
        un: "John Smith",
        exp: "June,2021",
        _tp: "Credential",
    },
    {
        pk: "U-001",
        sk: "C-002",
        gsi1pk: "C-002",
        gsi2pk: "U-001",
        cn: "Hiking Certification",
        un: "John Smith",
        exp: "April,2022",
        _tp: "Credential",
    },
];

async function startUpScript() {
    const data = await arc.tables();

    for (item of [...teams, ...users, ...certifications, ...credentials]) {
        await data.singletable.put(item);
    }

    console.log("startup script run");
}

module.exports = startUpScript;
