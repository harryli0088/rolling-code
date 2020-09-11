import React from 'react';

import Transmitter from "Components/Transmitter/Transmitter"
import Receiver from "Components/Receiver/Receiver"
import "./pair.scss"

interface PairProps {}

interface PairState {
  generator: "counter" | "rng",
  inRange: boolean,
  seed: number,
  transmitterValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      inRange: true,
      seed: new Date().getTime(),
      transmitterValue: -1,
    }
  }

  changeGenerator = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value==="rng" || value==="counter") {
      this.setState({
        generator: value,
        transmitterValue: -1,
      })
    }
  }

  clickTransmitterCallback = (value:number) => this.setState({transmitterValue: value})

  render() {
    const {
      generator,
      inRange,
      seed,
      transmitterValue,
    } = this.state

    return (
      <div className="pair">
        <div>
          <label>Number Generator</label>
          &nbsp; <select value={generator} onChange={this.changeGenerator}>
            <option value="counter">Simple Counter</option>
            <option value="rng">Psuedo Random Number Generator</option>
          </select>
        </div>

        <div>
          <label>In Range: </label> <input type="checkbox" checked={inRange} onChange={e => this.setState({inRange: !inRange})}/>
        </div>

        <div className={"devices " + (inRange?"inRange":"outOfRange")}>
          <div>
            <Transmitter
              clickTransmitterCallback={this.clickTransmitterCallback}
              generator={generator}
              inRange={inRange}
              seed={seed}
            />
          </div>

          <div>
            <Receiver
              generator={generator}
              listSize={5}
              seed={seed}
              transmitterValue={transmitterValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pair;
