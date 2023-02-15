import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import axios from "axios";

const Questions = () => {
  const [ques, setQues] = useState("");
  
  let [num, setNum]= useState(1);
  let incNum =()=>{
    if(num<5)
    {
    setNum(Number(num)+1);
    }
  };
  let decNum = () => {
     if(num>1)
     {
      setNum(num - 1);
     }
  }
 

  useEffect(() => {
    const fetchQues = async () => {
      const response = await axios({
        method: 'get',
        url: `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_${num}`,
        withCredentials: false,
        
      });
       const json = await response.data[0].Question;

      console.log(json);

      setQues(json);
    };

    fetchQues();
  }, [num]);

  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <div className="bg-secondary bg-gradient text-white">
    <MathJaxContext config={config} >
      <h2>Questions</h2>

      {ques && <MathJax>{ques}</MathJax>}

      <button className="btn btn-info" style={{marginRight:"8px"}} type="button" onClick={decNum}>Prev</button>

      <button className="btn btn-info" type="button" onClick={incNum}>Next</button>
  
    </MathJaxContext>
    </div>
  );
};

export default Questions;
