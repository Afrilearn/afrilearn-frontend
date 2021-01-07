import React, { useEffect, useRef, useState } from "react";
import { Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faComment,
  faPercent,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";
import linebisect from "../../../assets/img/linebisect.png";
import flag from "../../../assets/img/flag.png";
import podcast from "../../../assets/img/podcast.png";
import excla from "../../../assets/img/excla.png";
import metric from "../../../assets/img/metric.png";
import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";

const PastQuestionQuizPage = (props) => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
    } else {
      // do componentDidUpdate logic
    }
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const showCompleteMessage = () => {
    const quizPageSectionTwo = document.getElementById("pqQuizPageSectionTwo");
    const quizPageSectionOne = document.getElementById("pqQuizPageSectionOne");
    quizPageSectionOne.style.display = "none";
    quizPageSectionTwo.style.display = "block";
    toggle();
  };
  const hideCompleteMessage = () => {
    const quizPageSectionTwo = document.getElementById("pqQuizPageSectionTwo");
    const quizPageSectionOne = document.getElementById("pqQuizPageSectionOne");
    quizPageSectionOne.style.display = "block";
    quizPageSectionTwo.style.display = "none";
  };
  return (
    <React.Fragment>
      <div id="pqQuizPageSectionOne">
        <Modal isOpen={modal} toggle={toggle} className="completeQuizPopUp">
          <ModalBody>
            <div class="popup-body">
              <FontAwesomeIcon
                icon={faTimes}
                style={{ position: "absolute", top: "5px", right: "10px" }}
                onClick={toggle}
              />
              <h4>You sure you are ready to submit?</h4>
              <img src={excla} alt="see" />
              <div class="call-to-action">
                <span onClick={toggle}>No, Cancel</span>
                <button onClick={showCompleteMessage}>Yes, Submit!</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <UncontrolledPopover
          trigger="focus"
          placement="bottom"
          target="PopoverFocus"
        >
          <PopoverBody>
            <h6>Well done Feyikemi!</h6>
            <p>Keep up the good work</p>
          </PopoverBody>
        </UncontrolledPopover>
        <h4>Geometrical Construction (2): Angles</h4>
        <div class="container">
          <div className="row">
            <div className="left col-md-5">
              <p>
                Examination:: <span>Junior WAEC</span>
              </p>
              <Progress value={2 * 5} />
              <div className="image">
                <img src={linebisect} alt="see this" />
              </div>
              <h6>Question 1</h6>
              <p>Which angle is represented in the diagram shown above?</p>
              <button className="option-button">A. 120</button>
              <button className="option-button active">B. 90</button>
              <button className="option-button">C. 180</button>
              <button className="option-button">D. 270</button>
              <div className="action-buttons">
                <Button className="skip-button" id="PopoverFocus" type="button">
                  Skip
                </Button>
                <img src={podcast} alt="icon-mic" />
                <img src={flag} alt="icon-flag" />
                <button onClick={toggle} className="submit-button">
                  Submit
                </button>
              </div>
            </div>

            <div className="right col-md-2"></div>
            <div className="right col-md-5">
              <div className="questions-answered">
                <span className="active">1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>21</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
                <span>30</span>
                <span>31</span>
                <span>32</span>
                <span>33</span>
                <span>34</span>
                <span>35</span>
                <span>36</span>
                <span>37</span>
                <span>38</span>
                <span>39</span>
                <span>40</span>
                <span>41</span>
                <span>42</span>
                <span>43</span>
                <span>44</span>
                <span>45</span>
                <span>46</span>
                <span>47</span>
                <span>48</span>
                <span>49</span>
                <span>50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="pqQuizPageSectionTwo">
        <div className="complete-message">
          <h1>Junior WAEC Agricultural Science 2000 </h1>
          <p>
            Well done Feyikemi. That was a nice try, you can do better next
            time! Keep up learning and do not stop practicing too
          </p>
          <h4>Metrics</h4>
          <div className="row row1">
            <div className="col-md-6">
              <img src={metric} alt="metric" />
            </div>
            <div className="col-md-6">
              <ul>
                <li>Correct: 30 </li>
                <li>Correct: 30 </li>
                <li>Correct: 30 </li>
              </ul>
            </div>
          </div>
          <h4>Grade</h4>
          <div className="row row2">
            <div className="col-6" style={{ textAlign: "left" }}>
              <FontAwesomeIcon
                icon={faCircle}
                style={{ marginRight: "20px" }}
              />{" "}
              Score
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              45 out of 60
            </div>
          </div>
          <div className="row row2">
            <div className="col-6" style={{ textAlign: "left" }}>
              <FontAwesomeIcon
                icon={faPercent}
                style={{ marginRight: "20px" }}
              />{" "}
              Percentage
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              56%
            </div>
          </div>
          <div className="row row2">
            <div className="col-6" style={{ textAlign: "left" }}>
              <FontAwesomeIcon
                icon={faComment}
                style={{ marginRight: "20px" }}
              />{" "}
              Remark
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              Good
            </div>
          </div>
        </div>
        <div class="row call-to-action">
          <div class="col-md-6">
            <button onClick={hideCompleteMessage}>Retake Quiz</button>
          </div>
          <span>Review Answers</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PastQuestionQuizPage;
