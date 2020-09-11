import React from 'react';

import Broadcaster from "Components/Broadcaster/Broadcaster"
import Listener from "Components/Listener/Listener"
import "./pair.scss"

interface PairProps {}

interface PairState {
  generator: "counter" | "rng",
  inRange: boolean,
  seed: number,
  broadcasterValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      inRange: true,
      seed: new Date().getTime(),
      broadcasterValue: -1,
    }
  }

  changeGenerator = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value==="rng" || value==="counter") {
      this.setState({
        generator: value,
        broadcasterValue: -1,
      })
    }
  }

  clickBroadcasterCallback = (value:number) => this.setState({broadcasterValue: value})

  render() {
    const {
      generator,
      inRange,
      seed,
      broadcasterValue,
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

        <div>
          <label>In Range: </label> <input type="checkbox" checked={inRange} onChange={e => this.setState({inRange: !inRange})}/>
        </div>

        <div className={"devices " + (inRange?"inRange":"outOfRange")}>
          <div>
            <Broadcaster
              clickBroadcasterCallback={this.clickBroadcasterCallback}
              generator={generator}
              inRange={inRange}
              seed={seed}
            />
          </div>

          <div>
            <Listener
              generator={generator}
              listSize={5}
              seed={seed}
              broadcasterValue={broadcasterValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pair;
