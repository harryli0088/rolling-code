import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faCarSide } from '@fortawesome/free-solid-svg-icons'

import patrick from "patrick.jpg"
import Pair from "Components/Pair/Pair"
import 'App.scss';

function App() {
  return (
    <div id="app">
      <header>
        <h1>Rolling Code</h1>
        <div><i>Securing keyless entry systems</i></div>
      </header>

      <section className="container">
        <div id="imgContainer">
          <img src={patrick} alt="Open Sesame"/>
        </div>

        <br/>

        <div>Keyless entry systems such as cars and garage doors allow us to remotely lock or unlock our belongings. With car keys, whenever we press a button to lock or unlock, our key broadcasts a signal out into the open, hoping that our car is in range to hear. But how is this system secured?</div>

        <br/>

        <Pair kioskMode={true} openSesame/>

        <br/>

        <div>Imagine we had to shout a passcode "OPEN SESAME" on the top of our lungs anytime we wanted to unlock our car! Anybody could listen then steal our car by repeating the same passcode ("OPEN SESAME")!</div>

        <hr/>

        <div><b>Rolling Code</b> is a system used to secure keyless entry systems. Instead of using the same passcode every time, Rolling Code systems deterministically generate single-use passcodes, so that no passcode will be repeated or reused.</div>

        <br/>

        <Pair kioskMode={true}/>

        <br/>

        <div>An example this is a simple counter. Both the <b>transmitter</b> (our key <FontAwesomeIcon icon={faKey}/>) and <b>receiver</b> (our car <FontAwesomeIcon icon={faCarSide}/>) start from 0 and will increment their counts by one. Everytime we press the key, the key sends out next the number (ie 1...2...3...). Our car will listen for these numbers and internally increment its own count (1...2...3...) whenever it hears the valid number, so that no number is ever repeated. <b>A passcode is only valid for one use, and will not be accepted again</b>. In order for this to work, both the transmitter and the receiver must:</div>
        <ol>
          <li>Agree on the same starting number (called a "seed")</li>
          <li>Use the same function to deterministically generate successive numbers</li>
        </ol>

        <br/>

        <div>This is why car keys need to "pair" or synchronize with the car first before being usable.</div>

        <hr/>

        <h3>Pseusorandom Number Generators</h3>

        <div>Instead of using a simple counter, rolling code implementations can use <b>Pseudorandom Number Generators</b> (PRNGs). These PRNGs, given a seed, will deterministically generate successive numbers; ideally, the generated sequence of numbers will be unpredictable (ie close to random) and will be completely different given a different seed.</div>

        <h3>Try it out yourself!</h3>

        <Pair kioskMode={false}/>

        <h3>Why does the car have a list of numbers?</h3>

        <div>The car generates a list of numbers in case we press our key button when the car is not in range. Because our key generates numbers "forwards" and does not go back to previous numbers, our car must keep a list of future numbers that our key might send. When we our key transmits a number in the middle of the list, our car will invalidate all previous numbers and generate new numbers to fill the list. In this simple example, if we press our key too many times, it will generate numbers beyond those in our car's list, and we will be permanantly locked out. Rolling Code systems, such as <a href="https://en.wikipedia.org/wiki/KeeLoq" target="_blank" rel="noopener noreferrer">KeeLoq</a> can be designed to avoid this issue.</div>
      </section>

      <footer className="container">
        <p>Thank you to Andrew Nohawk for the inspiration, explanation, and real-life hacking examples! <a href="https://www.andrewmohawk.com/2016/02/05/bypassing-rolling-code-systems/" target="_blank" rel="noopener noreferrer">https://www.andrewmohawk.com/2016/02/05/bypassing-rolling-code-systems/</a></p>

        <p>Github Repo: <a href="https://github.com/harryli0088/rolling-code" target="_blank" rel="noopener noreferrer">https://github.com/harryli0088/rolling-code</a></p>

        <p>
          Read more about Rolling Code: <a href="https://en.wikipedia.org/wiki/Rolling_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Rolling_code</a>
        </p>

        <br/>
        <p>Built using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typescript</a></p>
        <p>Media icons: <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a></p>
        <p>CSS Speech Bubbles: <a href="http://nicolasgallagher.com/pure-css-speech-bubbles/demo/" target="_blank" rel="noopener noreferrer">http://nicolasgallagher.com/pure-css-speech-bubbles/demo/</a></p>
      </footer>
    </div>
  );
}

export default App;
