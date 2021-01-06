import React from "react";
import "./css/style.css";
import pqimagetwo from "../../../assets/img/pqimagetwo.png";
import pqimageseven from "../../../assets/img/pqimageseven.png";
import pqimagesix from "../../../assets/img/pqimagesix.png";
import pqimagefive from "../../../assets/img/pqimagefive.png";
import pqimagefour from "../../../assets/img/pqimagefour.png";
import pqimagethree from "../../../assets/img/pqimagethree.png";
import PastQuestionsSubjectBadge from "../../includes/pastQuestionsSubjectBadge/pastQuestionsSubjectBadge.component";

const PastQuestions = () => {
  return (
    <React.Fragment>
      <div id="pastQuestionsSectionone">
        <h1>Junior WAEC</h1>
        <aside>
          <p>Past Question</p>
          <h5>Select Subject</h5>
        </aside>
      </div>
      <div id="pastQuestionsSectionTwo">
        <div className="items">
          <PastQuestionsSubjectBadge
            image={pqimagetwo}
            title="Arigultural Science"
          />
          <PastQuestionsSubjectBadge image={pqimagethree} title="Mathematics" />
          <PastQuestionsSubjectBadge
            image={pqimagefour}
            title="English Language"
          />
          <PastQuestionsSubjectBadge
            image={pqimagefive}
            title="Computer Science"
          />
          <PastQuestionsSubjectBadge
            image={pqimagesix}
            title="Civic Education"
          />
          <PastQuestionsSubjectBadge
            image={pqimageseven}
            title="Civic Education"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PastQuestions;
