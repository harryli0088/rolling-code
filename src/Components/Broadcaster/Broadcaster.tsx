import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'

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
  showValue: boolean,
  value: number,
}

export default class Broadcaster extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      nextValue: this.valueGenerator(),
      showValue: false,
      value: -1,
    }
  }

  componentDidUpdate(prevProps:Props) {
    if(prevProps.generator !== this.props.generator) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        nextValue: this.valueGenerator(), //calculate the next value
        showValue: false,
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
      showValue: true,
      value: this.state.nextValue,
    })

    setTimeout(
      () => this.setState({ showValue: false }),
      1000,
    )
  }

  render() {
    const {
      nextValue,
      showValue,
      value,
    } = this.state

    return (
      <div className="broadcaster">
        <div className={"value" + (showValue?" show":"")}>{value>0 ? value : "-"} <FontAwesomeIcon icon={faSatelliteDish}/></div>
        <div className="nextValue"><b>Next Value: </b>{nextValue}</div>
        <button onClick={e => this.onClick()}>Lock/Unlock</button>
      </div>
    )
  }
}
