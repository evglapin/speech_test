import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropDown = (props) => {
  const { data, className, setSelect, selected, title } = props;

  const onSelect = eventKey => {
    setSelect(Number(eventKey))
  }

  return (
    <Dropdown onSelect={onSelect} id="d" className={className}>
      <Dropdown.Toggle id="dropdown-basic">
        {`${title || ""} ${data[selected]}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {data.map((item, index) => (
          <Dropdown.Item eventKey={index} key={index}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;