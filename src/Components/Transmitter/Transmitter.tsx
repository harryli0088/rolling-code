import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./transmitter.scss"

interface Props {
  clickTransmitterCallback: (value:number) => void,
  generator: "counter" | "rng",
  inRange: boolean,
  reset: boolean,
  seed: number,
}

interface State {
  nextValue: number,
  showValue: boolean,
  value: number,
}

export default class Transmitter extends React.Component<Props,State> {
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
    if(
      prevProps.generator !== this.props.generator
      || prevProps.reset !== this.props.reset
    ) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed) //set the generator

      this.setState({
        nextValue: this.valueGenerator(), //calculate the next value
        showValue: false,
        value: -1,
      })
    }
  }

  onClick = () => {
    if(this.props.inRange) { //if the listener is in range
      this.props.clickTransmitterCallback(this.state.nextValue) //send the next value to the parent
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
      generator,
    } = this.props

    const {
      nextValue,
      showValue,
      value,
    } = this.state

    return (
      <div className="transmitter">
        <div className={`value ${generator}` + (showValue?" show":"")}>
          <span>{value>0 ? value : "-"}</span>
          <FontAwesomeIcon icon={faSatelliteDish}/>
        </div>
        
        <div className={"nextValue" + (showValue?"":" show")}>
          <b>Next Value: </b>{nextValue}
        </div>

        <button onClick={e => this.onClick()}>Lock/Unlock</button>
      </div>
    )
  }
}
