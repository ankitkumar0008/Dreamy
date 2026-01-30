import { createContext, useState } from "react";
import runchat from "../config/dreamy";
export const Context = createContext();

const ContextProvider = (props) => {
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
  const newChat = ()=>{
    setLoading(false);
    setshowResult(false);
  }
  const onSent = async (prompt,isCard=false) => {
    setResultData("");
    setLoading(true);
    setshowResult(true);
    let response;
    if(prompt !== undefined && !isCard){
        response = await runchat(prompt);
        setPrevPrompts(prompt)
        
    }else{
        if(isCard){
        setPrevPrompts(prev=>[...prev,prompt])
        setrecentPrompt(prompt);
        response =  await runchat(prompt)
        }else{
        setPrevPrompts(prev=>[...prev,input])
        setrecentPrompt(input);
        response =  await runchat(input)
        }
        
    }
    const responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newRespnonseArray = newResponse2.split(" ");
    for (let i = 0; i < newRespnonseArray.length; i++) {
      const nextWord = newRespnonseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
