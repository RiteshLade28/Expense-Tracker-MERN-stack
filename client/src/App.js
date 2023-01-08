import { useState } from "react";

function App(){
  const [form, setForm] = useState({
    amount: 0,
    details: '',
    date: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const res = await fetch('http://localhost:4000/transaction',{
      method: "POST",
      body: form
    })
    console.log(res);
  }

  const handleInput = (e) => {
    console.log(e.target.value);
    setForm({...form, [e.target.name]: e.target.value});
  }
  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={form.amount} name="amount" onChange={handleInput} placeholder="Enter Transaction Amount" />
        <input type="test" value={form.details} name="details" onChange={handleInput} placeholder="Enter Transaction Details"/>
        <input type="date" value={form.date} name="date" onChange={handleInput}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
