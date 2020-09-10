import React from 'react';

import Counter from "Classes/Counter"
import Listener from "Components/Listener/Listener"

interface PairProps {}

interface PairState {
  generator: "counter" | "rng",
  senderValue: number,
}

class Pair extends React.Component<PairProps,PairState> {
  senderValueGenerator: () => number

  constructor(props:PairProps) {
    super(props)

    this.state = {
      generator: "counter",
      senderValue: -1,
    }

    this.senderValueGenerator = new Counter().increment
  }

  clickSender = () => this.setState({senderValue: this.senderValueGenerator()})

  render() {
    const {
      generator,
      senderValue,
    } = this.state

    return (
      <div>
        <div>
          {senderValue}
          <button onClick={e => this.clickSender()}>Lock/Unlock</button>
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
