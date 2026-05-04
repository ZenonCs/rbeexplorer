export default function Home() {
  async function buy(plan) {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ plan })
    });
    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="bg">
      <div className="card">
        <h1>Key System</h1>
        <p>Clean access. Paid keys.</p>

        <div className="grid">
          <div className="box">
            <h2>$2</h2>
            <p>3 Day</p>
            <button onClick={()=>buy("3day")}>Buy</button>
          </div>

          <div className="box">
            <h2>$5</h2>
            <p>Lifetime</p>
            <button onClick={()=>buy("lifetime")}>Buy</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #1a1a2e, #0a0a0a);
          color: white;
          font-family: sans-serif;
        }
        .card {
          background: rgba(255,255,255,0.05);
          padding: 40px;
          border-radius: 16px;
          backdrop-filter: blur(12px);
          width: 420px;
          text-align: center;
        }
        .grid {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        .box {
          flex: 1;
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 12px;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #6c5ce7;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
