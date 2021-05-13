import React, {useState} from "react";
import Speech from 'react-speech';
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMicrophone,  
} from "@fortawesome/free-solid-svg-icons";


const TextToSpeech = props => {
  const [audioState, setAudioState] = useState(false)
  const handleClick = () =>{
    setAudioState(!audioState)
  }
  return (
    <> 
    <span onClick={handleClick} style={{position:'relative'}}>  
     <Speech      
      text={props.content}
      textAsButton={true}
      stop={audioState}
      displayText={<FontAwesomeIcon icon={faMicrophone} />}
     />      
     </span>  
    </>
  );
}

export default TextToSpeech;
