import { db } from './firebase';

const createUser = (id: string) => {
  const ref = db.ref(`users/${id}`);
  console.dir(ref);
  ref.push({test: 'abcdf'}, (err) => { console.log(err) });
  console.log('created user');
};

export { createUser };
