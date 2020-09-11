import React from 'react';

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./sender.scss"

interface Props {
  clickSenderCallback: (value:number) => void,
  generator: "counter" | "rng",
  seed: number,
  value: number,
}

interface State {}

export default class Sender extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {}
  }

  componentDidUpdate(prevProps:Props) {
    if(prevProps.generator !== this.props.generator) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)
    }
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
