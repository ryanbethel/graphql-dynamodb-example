const arc = require("@architect/functions");
const { DB_MAP } = require("../src/http/post-graphql/db-schema");

const teams = [
    {
        pk: "T_001",
        sk: "#",
        gsi1pk: "Team",
        gsi1sk: "Team One",
        tn: "Team One",
        _tp: "Team",
    },
];
const users = [
    {
        pk: "U_001",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Smith",
        gsi2pk: "T_001",
        gsi2sk: "#",
        un: "John Smith",
        _tp: "User",
    },
    {
        pk: "U_002",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Doe",
        gsi2pk: "T_001",
        gsi2sk: "#",
        un: "Jane Doe",
        _tp: "User",
    },
    {
        pk: "U_003",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Doe",
        gsi2pk: "T_001",
        gsi2sk: "#",
        un: "John Doe",
        _tp: "User",
    },
    {
        pk: "U_004",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Smith",
        gsi2pk: "T_001",
        gsi2sk: "#",
        un: "Jane Smith",
        _tp: "User",
    },
];
const certifications = [
    {
        pk: "C_001",
        sk: "#",
        gsi1pk: "Certification",
        gsi2pk: "Rock Certification",
        cn: "Rock Certification",
        _tp: "Certification",
    },
    {
        pk: "C_002",
        sk: "#",
        gsi1pk: "Certification",
        gsi2pk: "Hiking Certification",
        cn: "Hiking Certification",
        _tp: "Certification",
    },
];
const credentials = [
    {
        pk: "U_001",
        sk: "C_001",
        gsi1pk: "C_001",
        gsi2pk: "U_001",
        cn: "Rock Certification",
        un: "John Smith",
        exp: "June,2021",
        _tp: "Credential",
    },
    {
        pk: "U_001",
        sk: "C_002",
        gsi1pk: "C_002",
        gsi2pk: "U_001",
        cn: "Hiking Certification",
        un: "John Smith",
        exp: "April,2022",
        _tp: "Credential",
    },
];

async function seedDb() {
    const data = await arc.tables();

    return Promise.all(
        [...teams, ...users, ...certifications, ...credentials].map((item) => data.singletable.put(item))
    );
}

seedDb()
    .then(() => console.log("local database seeded"))
    .catch((err) => console.log("error:" + err.message));
