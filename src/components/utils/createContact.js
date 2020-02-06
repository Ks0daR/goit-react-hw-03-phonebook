import uuid from 'uuid/v4';

export default function createContact(name, number) {
  return {
    id: uuid(),
    name,
    number,
  };
}
