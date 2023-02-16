import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import axios from "axios";

const config = {
  loader: { load: ["input/asciimath"] },
};

const Questions = () => {
  const [ques, setQues] = useState("");

  let [num, setNum] = useState(11);
  let incNum = () => {
    if (num < 16) { 
      setNum(prevNum => Number(prevNum) + 1);
    }
  };
  let decNum = () => {
    if (num > 11) {
      setNum(prevNum => Number(prevNum) - 1);
    }
  }
  const fetchQues = async () => {
    console.log('num = ', num);
    const response = await axios({
      method: 'get',
      url: `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_${num}`,
      withCredentials: false,
    });
    const json = response.data[0].Question;
    console.log("json -> ", json);
    setQues(json);
  };
  useEffect(() => {
    fetchQues();
  }, [num]);

  return (
    <div className="bg-secondary bg-gradient text-white">
      <MathJaxContext config={config} >
        <h2>Questions</h2>

        {ques && <MathJax>{ques}</MathJax>}

        <button className="btn btn-info" style={{ marginRight: "8px" }} type="button" onClick={decNum}>Prev</button>

        <button className="btn btn-info" type="button" onClick={incNum}>Next</button>

      </MathJaxContext>
    </div>
  );
};

export default Questions;
