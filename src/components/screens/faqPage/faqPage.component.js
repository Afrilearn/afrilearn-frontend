import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import event from "../../../assets/img/event.png";
import "./css/style.css";
import { getCourse } from "../../../redux/actions/courseActions";
import { getClass, assignContent } from "../../../redux/actions/classActions";
import { clearErrors } from "../../../redux/actions/errorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";

const FaqPage = (props) => {
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

  return (
    <div id="faqPage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Frequently Asked Questions | Myafrilearn.com</title>
        <meta name="description" content='Frequently Asked Questions' />
      </Helmet> 
      <div id="faqPageSectionOne">
        <h1 className="font2 text-bottom">
          Frequently <span>Asked Questions</span>
        </h1>
      </div>
      <div id="faqPageSectionTwo">
        <div class="top-text">
          <p>Our FAQs</p>
          <h1>Have any questions?</h1>
        </div>

        <div className="faq-list">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link tab-nav-item tab-nav-item-1 active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                GENERAL
              </button>
              <button
                class="nav-link tab-nav-item"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                SERVICES
              </button>
              <button
                class="nav-link tab-nav-item"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                CLASSES
              </button>
              <button
                class="nav-link tab-nav-item"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                PAYMENT
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {/* New  */}
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingOne">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What is Afrilearn?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn is an education streaming service that provides
                      West African Primary and Secondary School Students
                      (Primary 1-6 & JSS1-SS3) freedom to learn
                      curriculum-relevant subjects and topics anytime, anywhere.
                      With Afrilearn, there's always something exciting to learn
                      as new contents are added weekly!
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingTwo">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What is included in Afrilearn subscription?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Subscription includes unlimited access to all video
                      lessons, audio lessons, class notes, practice quizzes,
                      live classes and more, covering all subjects and topics,
                      in your chosen class. Brace yourself for a profoundly
                      life-changing experience.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingThree">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How much does Afrilearn cost?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn has a variety of plans to suit your learning
                      goals. Subscription Plans include Monthly - ₦999 ($2.99),
                      Quarterly - ₦2499 ($6.99), Bi-Annual - ₦4999 ($13.99),
                      Annual - ₦9999 ($26.99).
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFour">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Where can I watch?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      You can learn on Afrilearn via your smartphone, tablet,
                      Smart TV, laptop, or streaming device. Learn as much as
                      you want, whenever you want without a single commercial –
                      all for one low monthly price.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFive">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      How do I cancel?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Our focus is to transform users into ambassadors through
                      the best learning experience possible. You can easily
                      cancel your subscription in two clicks. If you have more
                      questions, please click{" "}
                      <Link to="/contact">
                        <b>contact us</b>
                      </Link>
                      . We’re super happy to help!
                    </div>
                  </div>
                </div>
                </div>
              {/* New  */}
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              {/* New  */}
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingOne">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What is Afrilearn?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn is an education streaming service that provides
                      West African Primary and Secondary School Students
                      (Primary 1-6 & JSS1-SS3) freedom to learn
                      curriculum-relevant subjects and topics anytime, anywhere.
                      With Afrilearn, there's always something exciting to learn
                      as new contents are added weekly!
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingTwo">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What is included in Afrilearn subscription?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Subscription includes unlimited access to all video
                      lessons, audio lessons, class notes, practice quizzes,
                      live classes and more, covering all subjects and topics,
                      in your chosen class. Brace yourself for a profoundly
                      life-changing experience.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingThree">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How much does Afrilearn cost?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn has a variety of plans to suit your learning
                      goals. Subscription Plans include Monthly - ₦999 ($2.99),
                      Quarterly - ₦2499 ($6.99), Bi-Annual - ₦4999 ($13.99),
                      Annual - ₦9999 ($26.99).
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFour">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Where can I watch?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      You can learn on Afrilearn via your smartphone, tablet,
                      Smart TV, laptop, or streaming device. Learn as much as
                      you want, whenever you want without a single commercial –
                      all for one low monthly price.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFive">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      How do I cancel?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Our focus is to transform users into ambassadors through
                      the best learning experience possible. You can easily
                      cancel your subscription in two clicks. If you have more
                      questions, please click{" "}
                      <Link to="/contact">
                        <b>contact us</b>
                      </Link>
                      . We’re super happy to help!
                    </div>
                  </div>
                </div>
                </div>
              {/* New  */}
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              {/* New  */}
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingOne">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What is Afrilearn?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn is an education streaming service that provides
                      West African Primary and Secondary School Students
                      (Primary 1-6 & JSS1-SS3) freedom to learn
                      curriculum-relevant subjects and topics anytime, anywhere.
                      With Afrilearn, there's always something exciting to learn
                      as new contents are added weekly!
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingTwo">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What is included in Afrilearn subscription?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Subscription includes unlimited access to all video
                      lessons, audio lessons, class notes, practice quizzes,
                      live classes and more, covering all subjects and topics,
                      in your chosen class. Brace yourself for a profoundly
                      life-changing experience.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingThree">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How much does Afrilearn cost?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Afrilearn has a variety of plans to suit your learning
                      goals. Subscription Plans include Monthly - ₦999 ($2.99),
                      Quarterly - ₦2499 ($6.99), Bi-Annual - ₦4999 ($13.99),
                      Annual - ₦9999 ($26.99).
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFour">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Where can I watch?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      You can learn on Afrilearn via your smartphone, tablet,
                      Smart TV, laptop, or streaming device. Learn as much as
                      you want, whenever you want without a single commercial –
                      all for one low monthly price.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <h2 class="accordion-header text-white" id="headingFive">
                    <button
                      class="accordion-button text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      How do I cancel?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Our focus is to transform users into ambassadors through
                      the best learning experience possible. You can easily
                      cancel your subscription in two clicks. If you have more
                      questions, please click{" "}
                      <Link to="/contact">
                        <b>contact us</b>
                      </Link>
                      . We’re super happy to help!
                    </div>
                  </div>
                </div>
                </div>
              {/* New  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FaqPage.propTypes = {
  getClass: PropTypes.func.isRequired,
  assignContent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  clazz: state.class.class,
  classMembers: state.class.classMembers,
  error: state.error,
});
export default connect(mapStateToProps, {
  getCourse,
  getClass,
  assignContent,
  clearErrors,
})(FaqPage);
