import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/admin" rel="noopener noreferrer">
            <button className="btn btn-primary"> Admin </button>
          </a>
        </div>
        <div>
          <a href="/pharmacist" rel="noopener noreferrer">
            <button className="btn btn-primary"> Pharmacist </button>
          </a>
        </div>
        <div>
          <a href="/patient" rel="noopener noreferrer">
            <button className="btn btn-primary"> Patient </button>
          </a>
        </div>
        <div>
          <a href="/pharmacist-requests/newRequest" rel="noopener noreferrer">
            <button className="btn btn-primary"> Request Pharmacist </button>
          </a>
        </div>
        <div>
          <a href="/patient/registerPatient" rel="noopener noreferrer">
            <button className="btn btn-primary"> Register as Patient </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
