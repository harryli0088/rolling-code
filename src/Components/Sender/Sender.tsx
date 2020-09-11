import React from 'react';

import Counter from "Classes/Counter"
import "./sender.scss"

interface Props {
  clickSenderCallback: (value:number) => void,
  generator: "counter" | "rng",
  value: number,
}

interface State {}

export default class Sender extends React.Component<Props,State> {
  valueGenerator: () => number

  constructor(props:Props) {
    super(props)

    this.valueGenerator = new Counter().increment

    this.state = {}
  }

  render() {
    const {
      clickSenderCallback,
      value,
    } = this.props

    return (
      <div className="sender">
        <div className="value">{value>0 ? value : "-"}</div>
        <button onClick={e => clickSenderCallback(this.valueGenerator())}>Lock/Unlock</button>
      </div>
    )
  }
}
