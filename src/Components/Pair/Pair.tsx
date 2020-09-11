import React from 'react';

import Sender from "Components/Sender/Sender"
import Listener from "Components/Listener/Listener"
import "./pair.scss"

interface PairProps {}

interface PairState {
  generator: "counter" | "rng",
  senderValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      senderValue: -1,
    }
  }

  clickSenderCallback = (value:number) => this.setState({senderValue: value})

  render() {
    const {
      generator,
      senderValue,
    } = this.state

    return (
      <div className="pair">
        <div>
          <Sender
            clickSenderCallback={this.clickSenderCallback}
            generator={generator}
            value={this.state.senderValue}
          />
        </div>

        <div>
          <Listener
            generator={generator}
            listSize={5}
            senderValue={senderValue}
          />
        </div>
      </div>
    );
  }
}

export default Pair;
