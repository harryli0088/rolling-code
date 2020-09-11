import React from 'react';

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./broadcaster.scss"

interface Props {
  clickBroadcasterCallback: (value:number) => void,
  generator: "counter" | "rng",
  seed: number,
  value: number,
}

interface State {
  nextValue: number,
}

export default class Broadcaster extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      nextValue: this.valueGenerator(),
    }
  }

  componentDidUpdate(prevProps:Props) {
    if(prevProps.generator !== this.props.generator) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        nextValue: this.valueGenerator(), //calculate the next value
      })
    }
  }

  onClick = () => {
    this.props.clickBroadcasterCallback(this.state.nextValue) //send the next value to the parent

    this.setState({
      nextValue: this.valueGenerator(), //calculate the next value
    })
  }

  render() {
    const {
      value,
    } = this.props

    const {
      nextValue,
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
