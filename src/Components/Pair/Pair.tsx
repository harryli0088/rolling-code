import React from 'react';

import Transmitter from "Components/Transmitter/Transmitter"
import Receiver from "Components/Receiver/Receiver"
import "./pair.scss"

interface PairProps {
  kioskMode: boolean,
}

interface PairState {
  generator: "counter" | "rng",
  inRange: boolean,
  reset: boolean, //use this field to induce resets in child components
  seed: number,
  transmitterValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      inRange: true,
      reset: false,
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

  reset = () => {
    this.setState({
      inRange: true,
      reset: !this.state.reset,
      transmitterValue: -1,
    })
  }

  getSettings = () => {
    if(this.props.kioskMode === false) {
      const {
        generator,
        inRange,
      } = this.state

      return (
        <div>
          <div>
            <label>Number Generator</label>
            &nbsp; <select value={generator} onChange={this.changeGenerator}>
              <option value="counter">Simple Counter</option>
              <option value="rng">Psuedorandom Number Generator</option>
            </select>
          </div>

          <div>
            <label>In Range: </label> <input type="checkbox" checked={inRange} onChange={e => this.setState({inRange: !inRange})}/>
          </div>

          <div>
            <button onClick={e => this.reset()}>Reset</button>
          </div>
        </div>
      )
    }
  }


  render() {
    const {
      kioskMode,
    } = this.props

    const {
      generator,
      inRange,
      reset,
      seed,
      transmitterValue,
    } = this.state

    return (
      <div className="pair">
        {this.getSettings()}

        <div className={"devices " + (inRange?"inRange":"outOfRange")}>
          <div>
            <Transmitter
              clickTransmitterCallback={this.clickTransmitterCallback}
              generator={generator}
              inRange={inRange}
              kioskMode={kioskMode}
              reset={reset}
              seed={seed}
            />
          </div>

          <div>
            <Receiver
              generator={generator}
              listSize={5}
              reset={reset}
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
