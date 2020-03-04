const fs = require('fs').promises;

class MyDB{
    constructor(db) {
        this.db = db
        if (!this.db.user) {
            this.db.user = []
        }
        if (!this.db.userid) {
            this.db.userid = []
        }
    }
    async save(path) {
        await fs.writeFile(path, JSON.stringify(this.db, null, '\t'));
        return;
    }
    static async load(path) {
        let oui = await fs.readFile(path, "utf8");
        let rtrn = JSON.parse(oui);
        return (new MyDB(rtrn));
    }
    createUser(firstname, lastname) {
        if (!firstname || !lastname) {
            return (error);
        }
        let id = Math.random().toString(36).substr(2, 9);
        let user = {firstname, lastname, id}
        this.db.user.push(user);
        return;
    }
    getUser(id) {
        let search = this.db.user.find(user => user.id === id);
        if (!search) {
            return (null);
        }
        return (search);
    }
    updateUser(id, firstname, lastname) {
        let usr = {user: []};
        usr = this.getUser(id);
        console.log(usr);
        if (!usr) {
            return null;
        }
        usr.firstname = firstname;
        usr.lastname = lastname;
    }
}

let base = {
    user: []
};
module.exports = MyDB;
async function main() {
    let oui = await MyDB.load('save.json');
//    oui.createUser('olivier', 'pute');
//    oui.createUser('arthur', 'admin');
//    oui.save('save.json');
    console.log(oui.db);
    let idd = oui.getUser('ck275uimj')
    console.log(idd);
    base = await idd.updateUser('ck275uimj', 'oui', 'non');
    console.log(idd);
}
main();