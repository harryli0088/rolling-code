import React from 'react';
import 'App.scss';

import Pair from "Components/Pair/Pair"

function App() {
  return (
    <div>
      <h2>Rolling Code</h2>

      <section>
        <div><i>Securing keyless entry systems</i></div>

        <br/>

        <div>Keyless entry systems such as cars and garage doors conveniently allow us to remotely lock or unlock our stuff. Whenever we press the button to lock or unlock, our remote broadcasts a signal out into the open, hoping that our car is in range to hear. But how is this system secure? Imagine shouting "PASSWORD123" on the top of your lungs anytime you wanted to unlock your car! Anybody could simply listen and repeat the same message later to steal your car!</div>

        <div><b>Rolling Code</b> is a method </div>

        <div>A simple example of this is a basic counter function. Both the broadcaster and listener</div>
      </section>

      <br/>

      <section>
        <Pair/>
      </section>
    </div>
  );
}

export default App;
