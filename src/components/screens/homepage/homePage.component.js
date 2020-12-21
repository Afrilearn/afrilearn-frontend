import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import AppreciationBox from "../../includes/appreciationSlick.component";
import Particles from "react-tsparticles";

const Homepage = (props) => {
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
    <span id="homepage">
      <div className="container-fluid bannerSection">
        <div className="overlay"></div>
        <img
          className="banner desktopOnly"
          src={require("../../../assets/img/sample.jpg")}
          alt="homepage banner"
        />
        <img
          className="banner mobileOnly"
          src={require("../../../assets/img/sample.jpg")}
          alt="homepage banner"
        />
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6 box">
            <h1>
              Welcome to the future
              <br className="desktopOnly"/> of fun learning!
            </h1>           
            <div className="row courseSelectSection">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-8 paddingRightOff">
                    <ul>
                      <li className="relative myDrop">
                        <Link className="myPlaceholder">
                          Select a Class
                          <img
                            className="downArrow"
                            src={require("../../../assets/img/downarrow.png")}
                            alt="down arrow"
                          />
                        </Link>
                        <ul className="courseSelectSectionDropDown">
                          <li>
                            <Link>Primary One</Link>
                          </li>
                          <li>
                            <Link>Primary Two</Link>
                          </li>
                          <li>
                            <Link>Primary Three</Link>
                          </li>
                          <li>
                            <Link>Primary Four</Link>
                          </li>
                          <li>
                            <Link>Primary Five</Link>
                          </li>
                          <li>
                            <Link>Primary Six</Link>
                          </li>
                          <li>
                            <Link>JSS One</Link>
                          </li>
                          <li>
                            <Link>JSS Two</Link>
                          </li>
                          <li>
                            <Link>JSS Three</Link>
                          </li>
                          <li>
                            <Link>SSS One</Link>
                          </li>
                          <li>
                            <Link>SSS Two</Link>
                          </li>
                          <li>
                            <Link>SSS Three</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-4 paddingLeftOff">
                    <Link to="/classes/9u09xunr90">
                      <input
                        type="submit"
                        value="GET STARTED"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"> </div>
        </div>
      </div>
      <div className="container-fluid afterBanner relative">                
        <div className="row relative">
        <Particles
        id="tsparticles"
        options={{
          "autoPlay": true,
          "background": {
            "color": {
              "value": "#000"
            },
            "image": "",
            "position": "",
            "repeat": "",
            "size": "",
            "opacity": 1
          },
          "backgroundMask": {
            "composite": "destination-out",
            "cover": {
              "color": {
                "value": "#fff"
              },
              "opacity": 1
            },
            "enable": false
          },
          "backgroundMode": {
            "enable": false,
            "zIndex": -1
          },
          "detectRetina": true,
          "fpsLimit": 60,
          "infection": {
            "cure": false,
            "delay": 0,
            "enable": false,
            "infections": 0,
            "stages": []
          },
          "interactivity": {
            "detectsOn": "window",
            "events": {
              "onClick": {
                "enable": false,
                "mode": []
              },
              "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
              },
              "onHover": {
                "enable": true,
                "mode": "trail",
                "parallax": {
                  "enable": false,
                  "force": 2,
                  "smooth": 10
                }
              },
              "resize": true
            },
            "modes": {
              "attract": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "bounce": {
                "distance": 200
              },
              "bubble": {
                "distance": 200,
                "duration": 0.4
              },
              "connect": {
                "distance": 80,
                "links": {
                  "opacity": 0.5
                },
                "radius": 60
              },
              "grab": {
                "distance": 100,
                "links": {
                  "blink": false,
                  "consent": false,
                  "opacity": 1
                }
              },
              "light": {
                "area": {
                  "gradient": {
                    "start": {
                      "value": "#ffffff"
                    },
                    "stop": {
                      "value": "#000000"
                    }
                  },
                  "radius": 1000
                },
                "shadow": {
                  "color": {
                    "value": "#000000"
                  },
                  "length": 2000
                }
              },
              "push": {
                "quantity": 4
              },
              "remove": {
                "quantity": 2
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "slow": {
                "factor": 3,
                "radius": 200
              },
              "trail": {
                "delay": 0.005,
                "quantity": 5,
                "particles": {
                  "color": {
                    "value": "#ff0000",
                    "animation": {
                      "enable": true,
                      "speed": 400,
                      "sync": true
                    }
                  },
                  "collisions": {
                    "enable": false,
                    "bounce": {
                      "horizontal": {
                        "random": {}
                      },
                      "vertical": {
                        "random": {}
                      }
                    }
                  },
                  "links": {
                    "enable": false,
                    "shadow": {},
                    "triangles": {}
                  },
                  "move": {
                    "outMode": "destroy",
                    "speed": 5,
                    "angle": {},
                    "attract": {
                      "rotate": {}
                    },
                    "gravity": {},
                    "noise": {
                      "delay": {
                        "random": {}
                      }
                    },
                    "outModes": {},
                    "trail": {}
                  },
                  "size": {
                    "value": 5,
                    "animation": {
                      "enable": true,
                      "speed": 5,
                      "minimumValue": 1,
                      "sync": true,
                      "startValue": "min",
                      "destroy": "max"
                    },
                    "random": {}
                  },
                  "bounce": {
                    "horizontal": {
                      "random": {}
                    },
                    "vertical": {
                      "random": {}
                    }
                  },
                  "life": {
                    "delay": {
                      "random": {}
                    },
                    "duration": {
                      "random": {}
                    }
                  },
                  "number": {
                    "density": {}
                  },
                  "opacity": {
                    "animation": {},
                    "random": {}
                  },
                  "rotate": {
                    "animation": {}
                  },
                  "shadow": {
                    "offset": {}
                  },
                  "shape": {},
                  "stroke": {
                    "color": {
                      "value": "",
                      "animation": {
                        "enable": false,
                        "speed": 0,
                        "sync": false
                      }
                    }
                  },
                  "twinkle": {
                    "lines": {},
                    "particles": {}
                  }
                }
              }
            }
          },
          "manualParticles": [],
          "motion": {
            "disable": false,
            "reduce": {
              "factor": 4,
              "value": true
            }
          },
          "particles": {
            "bounce": {
              "horizontal": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              },
              "vertical": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              }
            },
            "collisions": {
              "bounce": {
                "horizontal": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                },
                "vertical": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                }
              },
              "enable": true,
              "mode": "bounce"
            },
            "color": {
              "value": "#f00",
              "animation": {
                "enable": true,
                "speed": 50,
                "sync": false
              }
            },
            "life": {
              "count": 0,
              "delay": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "sync": false
              },
              "duration": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.0001
                },
                "value": 0,
                "sync": false
              }
            },
            "links": {
              "blink": false,
              "color": {
                "value": "random"
              },
              "consent": false,
              "distance": 100,
              "enable": true,
              "frequency": 1,
              "opacity": 1,
              "shadow": {
                "blur": 5,
                "color": {
                  "value": "#00ff00"
                },
                "enable": false
              },
              "triangles": {
                "enable": false,
                "frequency": 1
              },
              "width": 1,
              "warp": false
            },
            "move": {
              "angle": {
                "offset": 45,
                "value": 90
              },
              "attract": {
                "enable": false,
                "rotate": {
                  "x": 3000,
                  "y": 3000
                }
              },
              "direction": "none",
              "distance": 0,
              "enable": true,
              "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "maxSpeed": 50
              },
              "noise": {
                "delay": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 0
                },
                "enable": false
              },
              "outModes": {
                "default": "out"
              },
              "random": false,
              "size": false,
              "speed": 2,
              "straight": false,
              "trail": {
                "enable": false,
                "length": 10,
                "fillColor": {
                  "value": "#000000"
                }
              },
              "vibrate": false,
              "warp": false
            },
            "number": {
              "density": {
                "enable": true,
                "area": 800,
                "factor": 1000
              },
              "limit": 0,
              "value": 100
            },
            "opacity": {
              "random": {
                "enable": true,
                "minimumValue": 0.3
              },
              "value": 0.8,
              "animation": {
                "enable": true,
                "minimumValue": 0.3,
                "speed": 0.5,
                "sync": false
              }
            },
            "reduceDuplicates": false,
            "rotate": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
              },
              "direction": "clockwise",
              "path": false
            },
            "shadow": {
              "blur": 0,
              "color": {
                "value": "#000000"
              },
              "enable": false,
              "offset": {
                "x": 0,
                "y": 0
              }
            },
            "shape": {
              "options": {},
              "type": "star"
            },
            "size": {
              "random": {
                "enable": true,
                "minimumValue": 1
              },
              "value": 3,
              "animation": {
                "destroy": "none",
                "enable": true,
                "minimumValue": 1,
                "speed": 3,
                "startValue": "max",
                "sync": false
              }
            },
            "stroke": {
              "width": 0,
              "color": {
                "value": "",
                "animation": {
                  "enable": false,
                  "speed": 0,
                  "sync": false
                }
              }
            },
            "twinkle": {
              "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              },
              "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              }
            }
          },
          "pauseOnBlur": true,
          "pauseOnOutsideViewport": false,
          "themes": []
        }}
        />    
          <div className="col-md-6">
            <iframe
              width="456"
              title="Scale of perference"
              height="266"
              src="https://www.youtube.com/embed/F8XFbBiyrLc"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-md-6 shiftVideo">
            <h1>Enjoy unlimited video lessons!</h1>
            <h3>
              Download your favorite videos to watch offline and always have
              something to learn.
            </h3>
            <Link className="startLearning">Start Learning</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Gamified experience with rewards.</h1>
            <h3>
              Fun exam practice to ace WAEC, JAMB, NECO and more like a pro!
            </h3>
          </div>
          <div className="col-md-6">
            <img
              className="bigThing floatRight"
              src={require("../../../assets/img/gamified.gif")}
              alt="Next big thing"
            />
          </div>
        </div>
        <div className="row students relative">
        <Particles
        id="tsparticles"
        options={{
          "autoPlay": true,
          "background": {
            "color": {
              "value": "#000"
            },
            "image": "",
            "position": "",
            "repeat": "",
            "size": "",
            "opacity": 1
          },
          "backgroundMask": {
            "composite": "destination-out",
            "cover": {
              "color": {
                "value": "#fff"
              },
              "opacity": 1
            },
            "enable": false
          },
          "backgroundMode": {
            "enable": false,
            "zIndex": -1
          },
          "detectRetina": true,
          "fpsLimit": 60,
          "infection": {
            "cure": false,
            "delay": 0,
            "enable": false,
            "infections": 0,
            "stages": []
          },
          "interactivity": {
            "detectsOn": "window",
            "events": {
              "onClick": {
                "enable": false,
                "mode": []
              },
              "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
              },
              "onHover": {
                "enable": true,
                "mode": "trail",
                "parallax": {
                  "enable": false,
                  "force": 2,
                  "smooth": 10
                }
              },
              "resize": true
            },
            "modes": {
              "attract": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "bounce": {
                "distance": 200
              },
              "bubble": {
                "distance": 200,
                "duration": 0.4
              },
              "connect": {
                "distance": 80,
                "links": {
                  "opacity": 0.5
                },
                "radius": 60
              },
              "grab": {
                "distance": 100,
                "links": {
                  "blink": false,
                  "consent": false,
                  "opacity": 1
                }
              },
              "light": {
                "area": {
                  "gradient": {
                    "start": {
                      "value": "#ffffff"
                    },
                    "stop": {
                      "value": "#000000"
                    }
                  },
                  "radius": 1000
                },
                "shadow": {
                  "color": {
                    "value": "#000000"
                  },
                  "length": 2000
                }
              },
              "push": {
                "quantity": 4
              },
              "remove": {
                "quantity": 2
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "slow": {
                "factor": 3,
                "radius": 200
              },
              "trail": {
                "delay": 0.005,
                "quantity": 5,
                "particles": {
                  "color": {
                    "value": "#ff0000",
                    "animation": {
                      "enable": true,
                      "speed": 400,
                      "sync": true
                    }
                  },
                  "collisions": {
                    "enable": false,
                    "bounce": {
                      "horizontal": {
                        "random": {}
                      },
                      "vertical": {
                        "random": {}
                      }
                    }
                  },
                  "links": {
                    "enable": false,
                    "shadow": {},
                    "triangles": {}
                  },
                  "move": {
                    "outMode": "destroy",
                    "speed": 5,
                    "angle": {},
                    "attract": {
                      "rotate": {}
                    },
                    "gravity": {},
                    "noise": {
                      "delay": {
                        "random": {}
                      }
                    },
                    "outModes": {},
                    "trail": {}
                  },
                  "size": {
                    "value": 5,
                    "animation": {
                      "enable": true,
                      "speed": 5,
                      "minimumValue": 1,
                      "sync": true,
                      "startValue": "min",
                      "destroy": "max"
                    },
                    "random": {}
                  },
                  "bounce": {
                    "horizontal": {
                      "random": {}
                    },
                    "vertical": {
                      "random": {}
                    }
                  },
                  "life": {
                    "delay": {
                      "random": {}
                    },
                    "duration": {
                      "random": {}
                    }
                  },
                  "number": {
                    "density": {}
                  },
                  "opacity": {
                    "animation": {},
                    "random": {}
                  },
                  "rotate": {
                    "animation": {}
                  },
                  "shadow": {
                    "offset": {}
                  },
                  "shape": {},
                  "stroke": {
                    "color": {
                      "value": "",
                      "animation": {
                        "enable": false,
                        "speed": 0,
                        "sync": false
                      }
                    }
                  },
                  "twinkle": {
                    "lines": {},
                    "particles": {}
                  }
                }
              }
            }
          },
          "manualParticles": [],
          "motion": {
            "disable": false,
            "reduce": {
              "factor": 4,
              "value": true
            }
          },
          "particles": {
            "bounce": {
              "horizontal": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              },
              "vertical": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              }
            },
            "collisions": {
              "bounce": {
                "horizontal": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                },
                "vertical": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                }
              },
              "enable": true,
              "mode": "bounce"
            },
            "color": {
              "value": "#f00",
              "animation": {
                "enable": true,
                "speed": 50,
                "sync": false
              }
            },
            "life": {
              "count": 0,
              "delay": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "sync": false
              },
              "duration": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.0001
                },
                "value": 0,
                "sync": false
              }
            },
            "links": {
              "blink": false,
              "color": {
                "value": "random"
              },
              "consent": false,
              "distance": 100,
              "enable": true,
              "frequency": 1,
              "opacity": 1,
              "shadow": {
                "blur": 5,
                "color": {
                  "value": "#00ff00"
                },
                "enable": false
              },
              "triangles": {
                "enable": false,
                "frequency": 1
              },
              "width": 1,
              "warp": false
            },
            "move": {
              "angle": {
                "offset": 45,
                "value": 90
              },
              "attract": {
                "enable": false,
                "rotate": {
                  "x": 3000,
                  "y": 3000
                }
              },
              "direction": "none",
              "distance": 0,
              "enable": true,
              "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "maxSpeed": 50
              },
              "noise": {
                "delay": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 0
                },
                "enable": false
              },
              "outModes": {
                "default": "out"
              },
              "random": false,
              "size": false,
              "speed": 2,
              "straight": false,
              "trail": {
                "enable": false,
                "length": 10,
                "fillColor": {
                  "value": "#000000"
                }
              },
              "vibrate": false,
              "warp": false
            },
            "number": {
              "density": {
                "enable": true,
                "area": 800,
                "factor": 1000
              },
              "limit": 0,
              "value": 100
            },
            "opacity": {
              "random": {
                "enable": true,
                "minimumValue": 0.3
              },
              "value": 0.8,
              "animation": {
                "enable": true,
                "minimumValue": 0.3,
                "speed": 0.5,
                "sync": false
              }
            },
            "reduceDuplicates": false,
            "rotate": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
              },
              "direction": "clockwise",
              "path": false
            },
            "shadow": {
              "blur": 0,
              "color": {
                "value": "#000000"
              },
              "enable": false,
              "offset": {
                "x": 0,
                "y": 0
              }
            },
            "shape": {
              "options": {},
              "type": "circle"
            },
            "size": {
              "random": {
                "enable": true,
                "minimumValue": 1
              },
              "value": 3,
              "animation": {
                "destroy": "none",
                "enable": true,
                "minimumValue": 1,
                "speed": 3,
                "startValue": "max",
                "sync": false
              }
            },
            "stroke": {
              "width": 0,
              "color": {
                "value": "",
                "animation": {
                  "enable": false,
                  "speed": 0,
                  "sync": false
                }
              }
            },
            "twinkle": {
              "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              },
              "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              }
            }
          },
          "pauseOnBlur": true,
          "pauseOnOutsideViewport": false,
          "themes": []
        }}
        /> 
          <div className="col-md-8">
            <h1>
              Students love using
              <br className="desktopOnly" /> Afrilearn
            </h1>
            <h2 className="green">105,784</h2>
            <h4 className="green">Happy Students</h4>
          </div>
          <div className="col-md-4">
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/video.png")}
                  alt="video lessons"
                />
              </div>
              <div className="col-8">
                <h2>178,345,948</h2>
                <h5>Video Lessons</h5>
              </div>
            </div>
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/questions.png")}
                  alt="questions"
                />
              </div>
              <div className="col-8">
                <h2>120,984,030</h2>
                <h5>Practice Questions</h5>
              </div>
            </div>
            <div className="row push">
              <div className="col-4">
                <img
                  className="iconSet"
                  src={require("../../../assets/img/topics.png")}
                  alt="topics"
                />
              </div>
              <div className="col-8">
                <h2>104,384,231</h2>
                <h5>Topic Quizzes</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img
              className="bigThing other"
              src={require("../../../assets/img/personified.gif")}
              alt="Personalised learning."
            />
          </div>
          <div className="col-md-6">
            <h1>Personalised learning.</h1>
            <h3>
              Understand how you learn best, where to focus, and practice at
              your own pace.
            </h3>
            <Link className="startLearning">Start Learning</Link>
          </div>
        </div>
        <div className="row mobile relative">
        <Particles
        id="tsparticles"
        options={{
          "autoPlay": true,
          "background": {
            "color": {
              "value": "#000"
            },
            "image": "",
            "position": "",
            "repeat": "",
            "size": "",
            "opacity": 1
          },
          "backgroundMask": {
            "composite": "destination-out",
            "cover": {
              "color": {
                "value": "#fff"
              },
              "opacity": 1
            },
            "enable": false
          },
          "backgroundMode": {
            "enable": false,
            "zIndex": -1
          },
          "detectRetina": true,
          "fpsLimit": 60,
          "infection": {
            "cure": false,
            "delay": 0,
            "enable": false,
            "infections": 0,
            "stages": []
          },
          "interactivity": {
            "detectsOn": "window",
            "events": {
              "onClick": {
                "enable": false,
                "mode": []
              },
              "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
              },
              "onHover": {
                "enable": true,
                "mode": "trail",
                "parallax": {
                  "enable": false,
                  "force": 2,
                  "smooth": 10
                }
              },
              "resize": true
            },
            "modes": {
              "attract": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "bounce": {
                "distance": 200
              },
              "bubble": {
                "distance": 200,
                "duration": 0.4
              },
              "connect": {
                "distance": 80,
                "links": {
                  "opacity": 0.5
                },
                "radius": 60
              },
              "grab": {
                "distance": 100,
                "links": {
                  "blink": false,
                  "consent": false,
                  "opacity": 1
                }
              },
              "light": {
                "area": {
                  "gradient": {
                    "start": {
                      "value": "#ffffff"
                    },
                    "stop": {
                      "value": "#000000"
                    }
                  },
                  "radius": 1000
                },
                "shadow": {
                  "color": {
                    "value": "#000000"
                  },
                  "length": 2000
                }
              },
              "push": {
                "quantity": 4
              },
              "remove": {
                "quantity": 2
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4,
                "speed": 1
              },
              "slow": {
                "factor": 3,
                "radius": 200
              },
              "trail": {
                "delay": 0.005,
                "quantity": 5,
                "particles": {
                  "color": {
                    "value": "#ff0000",
                    "animation": {
                      "enable": true,
                      "speed": 400,
                      "sync": true
                    }
                  },
                  "collisions": {
                    "enable": false,
                    "bounce": {
                      "horizontal": {
                        "random": {}
                      },
                      "vertical": {
                        "random": {}
                      }
                    }
                  },
                  "links": {
                    "enable": false,
                    "shadow": {},
                    "triangles": {}
                  },
                  "move": {
                    "outMode": "destroy",
                    "speed": 5,
                    "angle": {},
                    "attract": {
                      "rotate": {}
                    },
                    "gravity": {},
                    "noise": {
                      "delay": {
                        "random": {}
                      }
                    },
                    "outModes": {},
                    "trail": {}
                  },
                  "size": {
                    "value": 5,
                    "animation": {
                      "enable": true,
                      "speed": 5,
                      "minimumValue": 1,
                      "sync": true,
                      "startValue": "min",
                      "destroy": "max"
                    },
                    "random": {}
                  },
                  "bounce": {
                    "horizontal": {
                      "random": {}
                    },
                    "vertical": {
                      "random": {}
                    }
                  },
                  "life": {
                    "delay": {
                      "random": {}
                    },
                    "duration": {
                      "random": {}
                    }
                  },
                  "number": {
                    "density": {}
                  },
                  "opacity": {
                    "animation": {},
                    "random": {}
                  },
                  "rotate": {
                    "animation": {}
                  },
                  "shadow": {
                    "offset": {}
                  },
                  "shape": {},
                  "stroke": {
                    "color": {
                      "value": "",
                      "animation": {
                        "enable": false,
                        "speed": 0,
                        "sync": false
                      }
                    }
                  },
                  "twinkle": {
                    "lines": {},
                    "particles": {}
                  }
                }
              }
            }
          },
          "manualParticles": [],
          "motion": {
            "disable": false,
            "reduce": {
              "factor": 4,
              "value": true
            }
          },
          "particles": {
            "bounce": {
              "horizontal": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              },
              "vertical": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1
              }
            },
            "collisions": {
              "bounce": {
                "horizontal": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                },
                "vertical": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                }
              },
              "enable": true,
              "mode": "bounce"
            },
            "color": {
              "value": "#f00",
              "animation": {
                "enable": true,
                "speed": 50,
                "sync": false
              }
            },
            "life": {
              "count": 0,
              "delay": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "sync": false
              },
              "duration": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.0001
                },
                "value": 0,
                "sync": false
              }
            },
            "links": {
              "blink": false,
              "color": {
                "value": "random"
              },
              "consent": false,
              "distance": 100,
              "enable": true,
              "frequency": 1,
              "opacity": 1,
              "shadow": {
                "blur": 5,
                "color": {
                  "value": "#00ff00"
                },
                "enable": false
              },
              "triangles": {
                "enable": false,
                "frequency": 1
              },
              "width": 1,
              "warp": false
            },
            "move": {
              "angle": {
                "offset": 45,
                "value": 90
              },
              "attract": {
                "enable": false,
                "rotate": {
                  "x": 3000,
                  "y": 3000
                }
              },
              "direction": "none",
              "distance": 0,
              "enable": true,
              "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "maxSpeed": 50
              },
              "noise": {
                "delay": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 0
                },
                "enable": false
              },
              "outModes": {
                "default": "out"
              },
              "random": false,
              "size": false,
              "speed": 2,
              "straight": false,
              "trail": {
                "enable": false,
                "length": 10,
                "fillColor": {
                  "value": "#000000"
                }
              },
              "vibrate": false,
              "warp": false
            },
            "number": {
              "density": {
                "enable": true,
                "area": 800,
                "factor": 1000
              },
              "limit": 0,
              "value": 100
            },
            "opacity": {
              "random": {
                "enable": true,
                "minimumValue": 0.3
              },
              "value": 0.8,
              "animation": {
                "enable": true,
                "minimumValue": 0.3,
                "speed": 0.5,
                "sync": false
              }
            },
            "reduceDuplicates": false,
            "rotate": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0,
              "animation": {
                "enable": false,
                "speed": 0,
                "sync": false
              },
              "direction": "clockwise",
              "path": false
            },
            "shadow": {
              "blur": 0,
              "color": {
                "value": "#000000"
              },
              "enable": false,
              "offset": {
                "x": 0,
                "y": 0
              }
            },
            "shape": {
              "options": {},
              "type": "line"
            },
            "size": {
              "random": {
                "enable": true,
                "minimumValue": 1
              },
              "value": 3,
              "animation": {
                "destroy": "none",
                "enable": true,
                "minimumValue": 1,
                "speed": 3,
                "startValue": "max",
                "sync": false
              }
            },
            "stroke": {
              "width": 0,
              "color": {
                "value": "",
                "animation": {
                  "enable": false,
                  "speed": 0,
                  "sync": false
                }
              }
            },
            "twinkle": {
              "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              },
              "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
              }
            }
          },
          "pauseOnBlur": true,
          "pauseOnOutsideViewport": false,
          "themes": []
        }}
        /> 
          <div className="col-md-6 partOne">
            <h1>Learn on any device.</h1>
            <h3>Anywhere, everywhere. Cancel anytime.</h3>
            <div className="row push2">
              <div className="col-6">
                <img
                  className=""
                  src={require("../../../assets/img/playstore.png")}
                  alt="playstore"
                />
              </div>
              <div className="col-6">
                <img
                  className=""
                  src={require("../../../assets/img/applestore.png")}
                  alt="applestore"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="bigThing floatRight"
              src={require("../../../assets/img/exambly-mockup-for-website.png")}
              alt="Learn on any device."
            />
          </div>
        </div>
        <div className="row appreciation">
          <AppreciationBox />
        </div>
        <div className="row relative">
        <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "black",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      /> 
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h6 className="center">
              Interested? Enter your email and we’ll keep you in the loop!
            </h6>
            <div className="row">
              <div className="col-8 paddingRightOff">
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="col-4 paddingLeftOff">
                <input type="submit" value="Send" />
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </span>
  );
};

export default Homepage;
