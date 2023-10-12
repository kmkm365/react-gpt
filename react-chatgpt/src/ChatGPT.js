import React, { useState } from 'react';

import './ChatGPT.css';


const ChatGPT = () => {
    let [modal, setModal] = useState(false);
    let [main, setMain] = useState(true);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [relation, setRelation] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [cost, setCost] = useState('');
    const [purpose, setPurpose] = useState('');

    const openmodal = {
        content: {
            textAlign: 'center',
            backgroundColor: 'black',
            borderRadius: '0',
            width: '400px',
            position: 'relative'
        }
    }
    function Modal() {
        return (
            <div className="modal" style={{ backgroundColor: "pink" }}>
                <div style={{ fontSize: "25px" }}>{relation} 관계인 {age} {sex}성 에게 {purpose} 목적으로 선물을 하고 싶으시군요!<br />
                    예산 {cost} 내에서 선물을 추천해드리겠습니다.</div>
                <p className='output'>{output}</p>
                <div className='close' onClick={() => { setModal(false); setMain(""); }}>x</div>
            </div>
        )
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
                'max_tokens': 512,
            },
            body: JSON.stringify({
                prompt: `${relation} 관계인 ${sex}성 ${age}에게 선물을 하려는데 목적은 ${purpose}야 ${cost}정도의 예산을 가지고 있어 선물 좀 추천해줘`,




            })
        });
        const data = await response.json();
        console.log(data);
        console.log(prompt);
        if (data.choices && data.choices.length > 0) {
            setOutput(data.choices[0].text);
        } else {
            setOutput("No response from ChatGPT");
        }
    }
    return (

        <div>

            <header className='title'>
                <span style={{ color: " rgb(232, 124, 174)", fontSize: "40px", backgroundColor: "beige" }}>선</span>물을 <span style={{ color: " rgb(232, 124, 174)", fontSize: "40px", backgroundColor: "beige" }}>생</span>각하다
            </header>

            <main className={main === "notice" ? "aftermodal" : null}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="sex">  선물 대상의 성별은?</label>
                        <select id="sex" name="sex" value={sex} onChange={(e) => setSex(e.target.value)} >
                            <option value="남">👨🏻남</option>
                            <option value="여">👩🏻여</option>
                        </select>
                    </div>



                    <div className="form-group">
                        <label htmlFor="age">선물 대상의 나이는?</label>
                        <select id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} >
                            <option value="10대">10대</option>
                            <option value="20대">20대</option>
                            <option value="30대">30대</option>
                            <option value="40대">40대</option>
                            <option value="50대">50대</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cost"> 생각하는 금액대를 알려주세요</label>
                        <input type="text" id="cost" name="cost" onChange={(e) => setCost(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="relation"> 선물하는 분과의 관계를 알려주세요</label>
                        <input type="text" id="relation" name="relation" onChange={(e) => setRelation(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="purpose">
                            선물 목적을 알려주세요 (예: 기념일, 생일, 졸업 선물 등)
                            <input type="text" id="purpose" name="purpose" onChange={(e) => setPurpose(e.target.value)} />
                        </label>

                    </div>



                    <button type="submit" onClick={() => { setModal(true); setMain("notice"); }}>🎁선물 추천받기!</button>


                </form>
            </main>
            {modal === true ? <Modal /> : null}


            <footer>
            </footer>
        </div>
    );
};
/* return (
     <div>
         <form onSubmit={handleSubmit}>
             <input type="text" value={input} onChange={handleInputChange} />
             <button type="submit">Submit</button>
         </form>
         <div></div>
         <div>
             <strong>Output:</strong>
             <div>{output}</div>
         </div>
     </div>
 );
}*/

export default ChatGPT;