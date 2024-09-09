import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({amountOfLists, amountOfTasks}) {
  return (
    <Navbar className="bg-body-tertiary mt-3 mb-3 shadow ">
      <Container>
        <Navbar.Brand href="#home">TO DO LIST</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             Общее кол-во листов: {amountOfLists} / Общее кол-во тасков: {amountOfTasks}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header