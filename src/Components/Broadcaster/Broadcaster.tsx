import React from 'react';

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./broadcaster.scss"

interface Props {
  clickBroadcasterCallback: (value:number) => void,
  generator: "counter" | "rng",
  inRange: boolean,
  seed: number,
}

interface State {
  nextValue: number,
  value: number,
}

export default class Broadcaster extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      nextValue: this.valueGenerator(),
      value: -1,
    }
  }

  componentDidUpdate(prevProps:Props) {
    if(prevProps.generator !== this.props.generator) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        nextValue: this.valueGenerator(), //calculate the next value
        value: -1,
      })
    }
  }

  onClick = () => {
    if(this.props.inRange) { //if the listener is in range
      this.props.clickBroadcasterCallback(this.state.nextValue) //send the next value to the parent
    }

    this.setState({
      nextValue: this.valueGenerator(), //calculate the next value
      value: this.state.nextValue,
    })
  }

  render() {
    const {
      nextValue,
      value,
    } = this.state

    return (
      <div className="broadcaster">
        <div className="value">{value>0 ? value : "-"}</div>
        <div className="nextValue"><b>Next Value: </b>{nextValue}</div>
        <button onClick={e => this.onClick()}>Lock/Unlock</button>
      </div>
    )
  }
}
