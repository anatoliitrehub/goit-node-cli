const fs = require("fs"); // /promises modern method
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "/db/contacts.json"); // dirname - path to file from root

// TODO: задокументувати кожну функцію
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const result = JSON.parse(data);
    console.log(result.find((el) => el.id === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const users = JSON.parse(data);
    const res = users.filter((el) => el.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(res, null, 2), (err) => {
      if (err) console.log("Error: ", err);
      else
        console.log(
          "User removed successfully",
          users.find((el) => el.id == contactId)
        );
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const newUser = { id: uniqid(), name, email, phone };
    const res = [...JSON.parse(data), newUser];
    fs.writeFile(contactsPath, JSON.stringify(res, null, "\t"), (err) => {
      if (err) console.log("Error: ", err);
      else console.log("User added successfully", newUser);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
