import { useState } from "react";

export default function Dashboard() {
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  async function check() {
    const res = await fetch("/api/validate", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ key })
    });

    const data = await res.json();
    setResult(data.valid ? "VALID KEY" : "INVALID");
  }

  return (
    <div style={{color:"white", textAlign:"center", marginTop:"100px"}}>
      <h1>Dashboard</h1>
      <input value={key} onChange={e=>setKey(e.target.value)} placeholder="Enter key"/>
      <button onClick={check}>Check</button>
      <p>{result}</p>
    </div>
  );
}
