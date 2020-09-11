import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faCarSide } from '@fortawesome/free-solid-svg-icons'

import Pair from "Components/Pair/Pair"
import 'App.scss';

function App() {
  return (
    <div>
      <h2>Rolling Code</h2>

      <section>
        <div><i>Securing keyless entry systems</i></div>

        <br/>

        <div>Keyless entry systems such as cars and garage doors conveniently allow us to remotely lock or unlock our belongings. With car keys, whenever we press the button to lock or unlock, our remote broadcasts a signal out into the open, hoping that our car is in range to hear. But how is this system secured? Imagine shouting our passcode "OPEN SESAME" on the top of your lungs anytime we wanted to unlock our car! Anybody could simply listen and repeat the same passcode ("OPEN SESAME") to steal it!</div>

        <div><b>Rolling Code</b> is a systems used to secure keyless entry systems. Instead of using the same passcode every time, Rolling Code systems deterministically generate single-use passcodes, so that no passcode will be repeated or reused.</div>

        <div>An example this is a simple counter. Both the <b>transmitter</b> (our key <FontAwesomeIcon icon={faKey}/>) and <b>receiver</b> (our car <FontAwesomeIcon icon={faCarSide}/>) start from 0 and will increment their counts by one. Everytime we press the key, the key sends out next the number (ie 1...2...3...). Our car will listen for these numbers and internally increment its own count (1...2...3...) whenever it hears the valid number, so that no number is ever repeated. <b>A passcode is only valid for one use, and will not be accepted again</b>. In order for this to work, both the transmitter and the receiver must:</div>
        <ol>
          <li>Agree on the same starting number (called a "seed")</li>
          <li>Use the same function to deterministically generate successive numbers</li>
        </ol>

        <div>This is why car keys need to "pair" or synchronize with the car first before being usable.</div>

        <div>Instead of using a simple counter, rolling code implementations can use <b>Pseudorandom Number Generators</b> (PRNGs). These PRNGs, given a seed, will deterministically generate successive numbers; ideally, the generated sequence of numbers will be unpredictable (ie close to random) and will be completely different given a different seed.</div>
      </section>

      <br/>

      <section>
        <Pair/>
      </section>
    </div>
  );
}

export default App;
