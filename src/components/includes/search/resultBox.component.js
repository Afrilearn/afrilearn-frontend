import React from "react";
import parse from "html-react-parser";

const Box = props => {	
	return (	      
        <div class="card-body">
          <div class="card no-border">
            <div class="card-body row result m-0">
              <div className="col-md-2 hide-later">
                <img
                  src={props.imageUrl}                      
                  class="img-left"
                  alt="..."
                />
              </div>

              <div className="col-md-10">
                <h5>{props.title}</h5>{" "}
                <small>{props.class}</small>
                <p>{parse(props.content.substr(0,210))}{props.content.length>210? '...':''}</p>
              </div>
            </div>
          </div>
        </div>

    );
};
export default Box;