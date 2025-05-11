import { useState } from 'react';
import './App.css';

function App() {
  const [RP, setRP] = useState('');
  const [Lab5, setLab5] = useState('');  
  const [Lab6, setLab6] = useState('');  
  const [DP, setDP] = useState('');  
  const [DPE, setDPE] = useState('');
  const [DP_dur, setDP_dur] = useState('');
  
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const incrementExp = (setter) => {
    setter((prevValue) => parseInt(prevValue || 0) + 3);
  };

  const decrementExp = (setter) => {
    setter((prevValue) => parseInt(prevValue || 0) - 3);
  };

  return (
    <>
      <h1>Revolution Idle Calculator</h1>

      {/* Eternity Card */}
      <div className="card">
        <h2 className="card-title">Eternity</h2>

        {/* Laboratory Card 1 */}
        <div className="card">
          <div className="card-header">
            <h4>Laboratory</h4>
          </div>
          <div className="card-body">
          <span> Current RPs: </span>
            <input
              type="number"
              value={RP}
              onChange={handleInputChange(setRP)}
              placeholder="RP"
              className="input-box"
            />
          </div>
          <div> <p></p> </div>
          {/* Second Line */}
          <div>
            <span> Ratio: </span>
            <input
              type="number"
              value={Lab5}
              onChange={handleInputChange(setLab5)}
              placeholder="Lab 5"
              className="input-box"
            />
            <span> : </span>
            <input
              type="number"
              value={Lab6}
              onChange={handleInputChange(setLab6)}
              placeholder="Lab 6"
              className="input-box"
            />
          </div>
          <div className="DP-result">
              <h5>Result: {(() => {
                const RPs = parseInt(RP) || 0;
                const ratio = [parseInt(Lab5) || 0, parseInt(Lab6) || 0]
                //const L5 = parseInt(Lab5) || 0;
                //const L6 = parseInt(Lab6) || 0;

                if (RPs > 0 && ratio[0] > 0 && ratio[1] > 0) {
                  // Perform the main calculation
                  const L5 = Math.floor(RPs/(ratio[0] + ratio[1]) * ratio[0]);
                  const L6 = Math.floor(RPs/(ratio[0] + ratio[1]) * ratio[1]);

          
                  // Round result to 2 decimal places
                  let result = `${L5} | ${L6} (${L5+L6})`;
          
                  // Format the result with 'E' and exponent
                  return `${result}`;
                }
                return 'Invalid inputs';
              })()}</h5>
            </div>
        </div>

        {/* Laboratory Card 2 */}
        <div className="card">
          <h4 className="card-title">Dilation</h4>
          <div className="Current-DP-income">
          <span> Current DP income: </span>
            <input
              type="number"
              value={DP}
              onChange={handleInputChange(setDP)}
              placeholder="DP"
              className="input-box"
            />
            <span> E </span>
            <input
              type="number"
              value={DPE}
              onChange={handleInputChange(setDPE)}
              placeholder="Exp"
              className="exp-input-box"
            />
            <button className="exp_btn" onClick={() => incrementExp(setDPE)}>+3</button>
            <button className="exp_btn" onClick={() => decrementExp(setDPE)}>-3</button>
            </div>
            <div> <p></p> </div>
            {/* Second Line */}
            <div>
              <span> Duration: </span>
              <input
                type="text"
                value={DP_dur}
                onChange={handleInputChange(setDP_dur)}
                placeholder="Seconds"
                className="dur-input-box"
                list="dur_options"  // Link to the datalist
              />
              <datalist id="dur_options">
                <option value="15" />
                <option value="30" />
                <option value="60" />
              </datalist>
            </div>
            <div className="DP-result">
              <h5>Result: {(() => {
                const dpIncome = parseInt(DP) || 0;
                const dpExp = parseInt(DPE) || 0;
                const duration = parseInt(DP_dur) || 0;

                if (duration > 0) {
                  // Perform the main calculation
                  let result = (dpIncome * Math.pow(10, dpExp)) * duration;
                  
                  // Adjust to scientific notation with a multiple of 3 exponent
                  let exponent = 0;
                  while (result >= 1000) {
                    result /= 1000;
                    exponent += 3;
                  }
          
                  // Round result to 2 decimal places
                  result = result.toFixed(2);
          
                  // Format the result with 'E' and exponent
                  return `${result}E+${exponent}`;
                }
                return 'Invalid inputs';
              })()}</h5>
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
