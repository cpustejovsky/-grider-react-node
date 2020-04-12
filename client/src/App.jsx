import React from "react";

function App() {
  return (
    <div>
      <h1>Grider Node/React App</h1>
      <div>
        <a href="/auth/google">Sign In with Google</a>
      </div>
      <div>
        <a href="/api/current_user">Check Current User</a>
      </div>
      <div>
        <a href="/logout">Log Out</a>
      </div>
    </div>
  );
}

export default App;
