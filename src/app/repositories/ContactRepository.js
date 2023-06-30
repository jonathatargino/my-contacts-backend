const { uuid } = require("uuidv4");

const contacts = [
  {
    id: uuid(),
    name: "José Lisboa",
    email: "joselisboaa@mail.com",
    phone: "123123451",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Jonatha Targino",
    email: "jonathatargino@mail.com",
    phone: "573123451",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Jorge Vitor",
    email: "jorgevitor@mail.com",
    phone: "933123451",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Levy Stevam",
    email: "levystevam@mail.com",
    phone: "1231783451",
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
