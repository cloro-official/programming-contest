const fs = require("fs-extra");
const { join } = require("path");

class User {
    constructor(name, phone, email) {
        var id = `user-${(new Date()).getTime()}`;
        var boolean = User.ensureIfValid(id);
        while (!boolean) {
            id = `user-${(new Date()).getTime()}`;
            boolean = User.ensureIfValid(id);
        }
        
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
 
    static ensureIfValid(id) {
        if (!fs.existsSync(join(__dirname, "database/users", id + ".json"))) {
            return true;
        }

        return false;
    }

    static constructFromJson(json) {
        const { id, name, phone, email } = json;
        const user = new User(name, phone, email);
        user.id = id;

        return user;
    }

    parseToJson() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email
        }
    }

    createFile() {
        const filePath = join(__dirname, "database/users", this.id + ".json");
        const data = JSON.stringify(this.parseToJson(), null, "\t");
        fs.ensureFileSync(filePath);
        fs.writeFileSync(filePath, data);
    }
}

module.exports = User