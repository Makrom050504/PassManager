import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('passwords2.db');

const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, website TEXT, username TEXT, password TEXT);'
        );
    });
};

export const insertPassword = (website, username, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO passwords (website, username, password) VALUES (?, ?, ?)',
                [website, username, password],
               
            );
        });
    });
};

export const getAllPasswords = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM passwords',
                [],
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error)
            );
        });
    });
};

export const deletePasswordByWebsite = (website) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM passwords WHERE website = ?',
                [website],
                (_, { rowsAffected }) => resolve(rowsAffected),
                (_, error) => reject(error)
            );
        });
    });
};


export const updatePassword = (id, newUsername, newPassword) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'UPDATE passwords SET username = ?, password = ? WHERE id = ?',
            [newUsername, newPassword, id],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve();
              } else {
                reject(new Error('Password not found'));
              }
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  export const fetchUserDataById = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM passwords WHERE id = ?',
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              const userData = result.rows.item(0); // Assuming id is unique, so only one row will be fetched
              resolve(userData);
            } else {
              reject(new Error('No user found with the provided ID.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  export const searchPasswordByWebsite = (website) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT username, password FROM passwords WHERE website = ?',
          [website],
          (_, { rows }) => {
            if (rows.length > 0) {
              const { username, password } = rows.item(0);
              resolve([username, password]); // Resolve with an array containing username and password
            } else {
              reject(new Error('No password found for the given website'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

export { createTable };

