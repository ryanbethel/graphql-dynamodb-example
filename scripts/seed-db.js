const arc = require("@architect/functions");
const { DB_MAP } = require("../src/http/post-graphql/db-schema");

const teams = [
    {
        pk: "T#t_01",
        sk: "#",
        gsi1pk: "Team",
        gsi1sk: "Team One",
        tn: "Team One",
        _tp: "Team",
    },
];
const users = [
    {
        pk: "U#u_01",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Smith",
        gsi2pk: "T#t_01",
        gsi2sk: "#",
        un: "John Smith",
        _tp: "User",
    },
    {
        pk: "U#u_02",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Doe",
        gsi2pk: "T#t_01",
        gsi2sk: "#",
        un: "Jane Doe",
        _tp: "User",
    },
    {
        pk: "U#u_03",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "John Doe",
        gsi2pk: "T#t_01",
        gsi2sk: "#",
        un: "John Doe",
        _tp: "User",
    },
    {
        pk: "U#u_04",
        sk: "#",
        gsi1pk: "User",
        gsi1sk: "Jane Smith",
        gsi2pk: "T#t_01",
        gsi2sk: "#",
        un: "Jane Smith",
        _tp: "User",
    },
];
const certifications = [
    {
        pk: "C#c_01",
        sk: "#",
        gsi1pk: "Certification",
        gsi1sk: "Rock Certification",
        cn: "Rock Certification",
        _tp: "Certification",
    },
    {
        pk: "C#c_02",
        sk: "#",
        gsi1pk: "Certification",
        gsi1sk: "Hiking Certification",
        cn: "Hiking Certification",
        _tp: "Certification",
    },
];
const credentials = [
    {
        pk: "U#u_01",
        sk: "C#c_01",
        gsi1pk: "C#c_01",
        gsi1sk: "U#u_01",
        cn: "Rock Certification",
        un: "John Smith",
        exp: "June,2021",
        _tp: "Credential",
    },
    {
        pk: "U#u_01",
        sk: "C#c_02",
        gsi1pk: "C#c_02",
        gsi1sk: "U#u_01",
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
