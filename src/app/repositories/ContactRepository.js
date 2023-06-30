const { uuid } = require("uuidv4");

let contacts = [
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

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuid(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(newContact);

      resolve(newContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
