import { useState, useEffect } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [numberPeople, setNumberPeople] = useState("");

  const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  useEffect(() => {
    // Calculate tip amount per person and total per person whenever bill, tipPercentage, or numberPeople changes
    if (bill && tipPercentage && numberPeople) {
      const tipAmount = (bill * tipPercentage) / 100;
      const totalAmount = bill + tipAmount;
      const perPersonTip = tipAmount / numberPeople;
      const perPersonTotal = totalAmount / numberPeople;

      setTipAmountPerPerson(perPersonTip);
      setTotalPerPerson(perPersonTotal);
    } else {
      // If any input is missing or zero, reset the calculated values
      setTipAmountPerPerson(0);
      setTotalPerPerson(0);
    }
  }, [bill, tipPercentage, numberPeople]);

  function setDefaultTipPercentage(defaultValue) {
    setTipPercentage(defaultValue);
  }

  function handleReset() {
    setBill("");
    setTipPercentage(0);
    setCustomTip("");
    setNumberPeople("");
    setTipAmountPerPerson(0);
    setTotalPerPerson(0);
  }

  return (
    <div className="caculator-box ">
      <div className="caculator-box-one">
        <Bill bill={bill} onSetBill={setBill} />
        <Tip
          tipPercentage={tipPercentage}
          onSetTip={setDefaultTipPercentage}
          customTip={customTip}
          onSetCustomTip={setCustomTip}
        />
        <NumberPeople
          numberPeople={numberPeople}
          onSetNumberPeople={setNumberPeople}
        />
      </div>
      <div className="caculator-box-two">
        <TipAmount tipAmountPerPerson={tipAmountPerPerson} />
        <Total totalPerPerson={totalPerPerson} />
        <div>{bill > 0 && <ResetButton onHandleReset={handleReset} />}</div>
      </div>
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div className="bill-box">
      <p className="label-bill">Bill</p>
      <input
        className="label-input"
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ tipPercentage, onSetTip, customTip, onSetCustomTip }) {
  return (
    <>
      <p className="label-tip">Select Tip %</p>

      <div className="tip-flex-box-one">
        <button className="tip-button" onClick={() => onSetTip(10)}>
          10%
        </button>
        <button className="tip-button" onClick={() => onSetTip(15)}>
          15%
        </button>
        <button className="tip-button" onClick={() => onSetTip(20)}>
          20%
        </button>
      </div>
      <div className="tip-flex-box-two">
        <button className="tip-button" onClick={() => onSetTip(25)}>
          25%
        </button>
        <button className="tip-button" onClick={() => onSetTip(30)}>
          30%
        </button>
        <input
          type="text"
          placeholder="Custom"
          className="tip-input-button"
          value={customTip}
          onChange={(e) => onSetCustomTip(Number(e.target.value))}
        />
      </div>
    </>
  );
}

function NumberPeople({ numberPeople, onSetNumberPeople }) {
  return (
    <>
      <p className="label-number-people">Number of People</p>
      <input
        type="text"
        className="label-number-people-input"
        value={numberPeople}
        onChange={(e) => onSetNumberPeople(Number(e.target.value))}
      />
    </>
  );
}

function TipAmount({ tipAmountPerPerson }) {
  return (
    <div className="tip-amount-box">
      <div>
        <p className="tip-amount-label">Tip Amount</p>
        <p className="tip-amount-tag">/ person</p>
      </div>

      <div>
        <p className="tip-amount-sum">${tipAmountPerPerson.toFixed(2)}</p>
      </div>
    </div>
  );
}

function Total({ totalPerPerson }) {
  return (
    <div className="total-amount-box">
      <div>
        <p className="total-amount-label">Total</p>
        <p className="total-amount-tag">/ person</p>
      </div>

      <div>
        <p className="total-amount-sum">${totalPerPerson.toFixed(2)}</p>
      </div>
    </div>
  );
}

function ResetButton({ onHandleReset }) {
  return (
    <button className="reset-button" onClick={onHandleReset}>
      RESET
    </button>
  );
}
