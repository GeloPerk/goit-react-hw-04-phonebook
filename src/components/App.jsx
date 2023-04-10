import { useState, useEffect } from 'react';
import { Container, Title, ContactList } from './App.styled';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        <ContactsForm addNewContact={addNewContact} />
      </Container>
      <Container>
        <Title>Contacts</Title>
        <Filter findByFilter={handleFilterChange} value={filter} />
        <ContactList>
          <Contacts contacts={filterContacts()} deleteContact={deleteContact} />
        </ContactList>
      </Container>
    </>
  );
}

export default App;