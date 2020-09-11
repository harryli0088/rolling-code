import React from 'react';

import Sender from "Components/Sender/Sender"
import Listener from "Components/Listener/Listener"
import "./pair.scss"

interface PairProps {}

interface PairState {
  generator: "counter" | "rng",
  seed: number,
  senderValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      seed: new Date().getTime(),
      senderValue: -1,
    }
  }

  changeGenerator = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value==="rng" || value==="counter") {
      this.setState({
        generator: value,
        senderValue: -1,
      })
    }
  }

  clickSenderCallback = (value:number) => this.setState({senderValue: value})

  render() {
    const {
      generator,
      seed,
      senderValue,
    } = this.state

    return (
      <div className="pair">
        <div>
          <label>Number Generator</label>
          <select value={generator} onChange={this.changeGenerator}>
            <option value="counter">Simple Counter</option>
            <option value="rng">Psuedo Random Number Generator</option>
          </select>
        </div>

        <div className="content">
          <div>
            <Sender
              clickSenderCallback={this.clickSenderCallback}
              generator={generator}
              seed={seed}
              value={this.state.senderValue}
            />
          </div>

          <div>
            <Listener
              generator={generator}
              listSize={5}
              seed={seed}
              senderValue={senderValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pair;
