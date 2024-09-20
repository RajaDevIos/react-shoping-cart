import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  // State to hold the selected dropdown item
  const [selectedItem, setSelectedItem] = useState('Shop');
  const [users, setUser] = useState([]);
  const [counter, setCounter] = useState(0);
  const [addedToCart, setAddedToCart] = useState([]);  // State to track added items

  // API CALL
  const fetchUserData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => {
        setUser(data.slice(0, 12)); // Fetch only 12 items
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // BUTTON EVENT: Add to cart and change button text
  const handleAddToCart = (userId) => {
    if (!addedToCart.includes(userId)) { // Check if the item is already added
      setAddedToCart([...addedToCart, userId]); // Add item to cart state
      setCounter(counter + 1); // Increment counter
    }
  };

  // Function to handle dropdown item selection
  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <> 
      <Navbar className="custom-navbar">
        <Container className="hello">
          <Navbar.Brand href="#home">Start Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <NavDropdown title={selectedItem} onSelect={handleSelect}>
                <NavDropdown.Item eventKey="All Product" href="#action/3.4">All Product</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="Popular Item" href="#action/3.1">Popular Item</NavDropdown.Item>
                <NavDropdown.Item eventKey="New Arrival" href="#action/3.2">New Arrival</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <Button className="cart">
          Cart <span className="count">{counter}</span>
        </Button>
      </Navbar>

      <div className="head-container">
        <h1 className="Title">Shop in Style</h1>
      </div>

      <div className="content-container">
        <div className="back">
          <Row xs={2} md={3} className="g-4">
            {users.map(user => (
              <Col md={4} key={user.id}>
                <Card.Body className="card">
                  <Card.Img src={user.url} className="img" />
                  <Card.Title className="title-card">{user.title}</Card.Title>
                  <button 
                    onClick={() => handleAddToCart(user.id)} 
                    className="addtocart" 
                    disabled={addedToCart.includes(user.id)}  // Disable if already added
                  >
                    {addedToCart.includes(user.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </Card.Body>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="bottom-container">
        <h2 className="Title4">Copyright © Your Website 2023</h2>
      </div>
    </>
  );
}

export default App;
