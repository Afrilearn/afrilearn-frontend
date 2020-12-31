import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import "./css/style.css";
import mastercardlogo from "../../../assets/img/mastercardlogo.png";
import colordots from "../../../assets/img/colordots.png";

const CardPayment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div id="paymentSectionOne">
      <Container>
        <div class="row">
          <div class="col">
            <div className="sub-details">
              <h4>Subscription Details</h4>
              <Row className="details-item">
                <Col className="details-key">Order Number: </Col>
                <Col xs="8" className="details-value">
                  0923495/tr4
                </Col>
              </Row>
              <Row className="details-item">
                <Col className="details-key">Ordered By:</Col>
                <Col xs="8" className="details-value">
                  Feyikemi Alaka
                </Col>
              </Row>
              <Row className="details-item">
                <Col className="details-key">Email:</Col>
                <Col xs="8" className="details-value">
                  feyikemi199@gmail.com
                </Col>
              </Row>
              <Row className="details-item">
                <Col className="details-key">Phone Number:</Col>
                <Col xs="8" className="details-value">
                  090123457890
                </Col>
              </Row>
              <Row className="details-item">
                <Col className="details-key">Access To: </Col>
                <Col xs="8" className="details-value">
                  <ul>
                    <li>Phasellus iaculis neque</li>
                    <li>Purus sodales ultricies</li>
                    <li>Vestibulum laoreet porttitor sem</li>
                    <li>Ac tristique libero volutpat at</li>
                  </ul>
                </Col>
              </Row>
              <Row className="details-item">
                <Col>Subscription for </Col>
                <Col xs="8" className="details-value">
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>JSS 1</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>JSS 2</DropdownItem>
                      <DropdownItem>JSS 3</DropdownItem>
                      <DropdownItem>SSS 1</DropdownItem>
                      <DropdownItem>SSS 2</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
              </Row>

              <Form>
                <FormGroup>
                  <Label for="input-class">Select subscription length</Label>
                  <Input type="select" name="select" id="input-class">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Bi- Annual</option>
                    <option>Yearly</option>
                  </Input>
                </FormGroup>
              </Form>
            </div>
          </div>
          <div class="col">
            <div className="pay-details">
              <div class="head">
                <h4>Payment Details</h4>
                <img src={colordots} alt="colordots" />
              </div>
              <Form>
                <FormGroup>
                  <Label for="card-num">Card Number</Label>
                  <InputGroup>
                    <Input placeholder="4657 7554 3764 3738" className="card-num" />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <img src={mastercardlogo} height="30px" alt="logo" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="card-num">Account Name</Label>
                  <InputGroup>
                    <Input placeholder="Feyikemi Alaka" className="card-num" />
                  </InputGroup>
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="card-num">Expiry Date</Label>
                      <InputGroup>
                        <Input className="card-num" type="date" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <FormGroup>
                      <Label for="card-num">CVV</Label>
                      <InputGroup>
                        <Input className="card-num" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <div class="pay-button">
                <button>Pay ₦500.00</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CardPayment;
