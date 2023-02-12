const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  //   console.log(result);
  return result ? result : null;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );

  const deletedContact = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return deletedContact ? deletedContact : null;
};

removeContact(3);

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const newObj = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newObj);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newObj;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
