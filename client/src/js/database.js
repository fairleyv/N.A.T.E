import { openDB } from 'idb';

const initdb = async () =>
  openDB('nate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('nate')) {
        console.log('nate database already exists');
        return;
      }
      db.createObjectStore('nate', { keyPath: 'id', autoIncrement: true });
      console.log('nate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const nateDb = await openDB('nate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = nateDb.transaction('nate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('nate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id:1, value:content});

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const nateDB = await openDB('nate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = nateDB.transaction('nate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('nate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;

};

initdb();
