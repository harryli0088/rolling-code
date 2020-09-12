import React from 'react';

import { GeneratorType } from "utils/getValueGenerator"
import Transmitter from "Components/Transmitter/Transmitter"
import Receiver from "Components/Receiver/Receiver"
import "./pair.scss"

interface PairProps {
  kioskMode: boolean,
  openSesame?: boolean,
}


export type TransmitterMessageType = {
  index: number,
  value: string,
}

interface PairState {
  generator: GeneratorType,
  inRange: boolean,
  reset: boolean, //use this field to induce resets in child components
  seed: number,
  transmitterMessage: TransmitterMessageType,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: props.openSesame ? "openSesame" : "counter",
      inRange: true,
      reset: false,
      seed: new Date().getTime(),
      transmitterMessage: {
        index: -1,
        value: "",
      },
    }
  }

  changeGenerator = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value==="rng" || value==="counter") {
      this.setState({
        generator: value,
        transmitterMessage: {
          index: -1,
          value: "",
        },
      })
    }
  }

  clickTransmitterCallback = (value:string) => this.setState({
    transmitterMessage: {
      index: this.state.transmitterMessage.index + 1,
      value,
    },
  })

  reset = () => {
    this.setState({
      inRange: true,
      reset: !this.state.reset,
      transmitterMessage: {
        index: -1,
        value: "",
      },
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
      openSesame,
    } = this.props

    const {
      generator,
      inRange,
      reset,
      seed,
      transmitterMessage,
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
              openSesame={openSesame}
              reset={reset}
              seed={seed}
            />
          </div>

          <div>
            <Receiver
              generator={generator}
              listSize={openSesame ? 1 : 5}
              openSesame={openSesame}
              reset={reset}
              seed={seed}
              transmitterMessage={transmitterMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pair;
