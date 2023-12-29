import ListGroup from "react-bootstrap/ListGroup";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

function ListGroupComponent() {
  let items = ["New york", "San Francisco", "London", "Cairo", "Paris"];

  items = [];

  return (
    <>
      <h1>List Title</h1>
      {items.length === 0 && <p> No item Found </p>}
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item key={item}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ListGroupComponent;
