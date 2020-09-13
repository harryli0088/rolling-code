import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import getValueGenerator, { GeneratorType, ValueGeneratorType } from "utils/getValueGenerator"
import "./transmitter.scss"

interface Props {
  autoPlay: boolean,
  clickTransmitterCallback: (value:string) => void,
  generator: GeneratorType,
  inRange: boolean,
  kioskMode: boolean,
  openSesame?: boolean,
  reset: boolean,
  seed: number,
}

interface State {
  nextValue: string,
  pressed: boolean,
  showValue: boolean,
  value: string,
}

export default class Transmitter extends React.Component<Props,State> {
  interval?:number
  pressStartTime: number
  timeout: number
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.pressStartTime = -1
    this.timeout = -1
    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      nextValue: this.valueGenerator(),
      pressed: false,
      showValue: false,
      value: "",
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate(prevProps:Props) {
    //if our generator has changed OR if we need to reset
    if(
      prevProps.generator !== this.props.generator
      || prevProps.reset !== this.props.reset
    ) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed) //set the generator

      this.setState({
        nextValue: this.valueGenerator(), //calculate the next value
        showValue: false,
        value: "",
      })
    }

    //we should start or stop autoplaying
    if(
      this.props.kioskMode //if we are in kiosk mode
      && prevProps.autoPlay !== this.props.autoPlay //if our autoplay mode has changed
    ) {
      //if we should start autoplaying
      if(this.props.autoPlay) {
        this.autoPress()
        this.interval = window.setInterval(
          this.autoPress,
          3000,
        )
      }
      else {
        clearInterval(this.interval) //stop autoplaying
      }
    }
  }

  autoPress = () => {
    this.onPress()
    setTimeout(
      this.onLift,
      500,
    )
  }

  onPress = (e?: React.MouseEvent | React.TouchEvent) => {
    if(e) {
      e.preventDefault()
    }

    this.pressStartTime = new Date().getTime()
    clearTimeout(this.timeout)

    if(this.props.inRange) { //if the listener is in range
      this.props.clickTransmitterCallback(this.state.nextValue) //send the next value to the parent
    }

    this.setState({
      nextValue: this.valueGenerator(), //calculate the next value
      pressed: true,
      showValue: true,
      value: this.state.nextValue,
    })
  }

  onLift = (e?: React.MouseEvent | React.TouchEvent) => {
    if(e) {
      e.preventDefault()
    }

    const pressTime = new Date().getTime() - this.pressStartTime

    this.timeout = window.setTimeout(
      () => this.setState({ showValue: false }),
      1000 - pressTime,
    )

    this.setState({ pressed: false })
  }


  render() {
    const {
      generator,
      openSesame,
    } = this.props

    const {
      nextValue,
      showValue,
      value,
    } = this.state

    return (
      <div className="transmitter">
        <div className={`value ${generator}` + (showValue?" show":"")}>
          <span>{value ||  "-"}</span>
          <FontAwesomeIcon icon={faSatelliteDish}/>
        </div>

        <div className={"nextValue" + (showValue?"":" show") + (openSesame?" openSesame":"")}>
          <b>Next Value: </b>{nextValue}
        </div>

        <br/>

        <div className="keyContainer">
          <div className={"key" + (this.state.pressed?" pressed":"")}>
            <span className="led"></span>
            <button
              onMouseDown={this.onPress}
              onMouseUp={this.onLift}
              onMouseLeave={this.onLift}
              onTouchStart={this.onPress}
              onTouchEnd={this.onLift}
              onTouchCancel={this.onLift}
            >
              <FontAwesomeIcon icon={faLockOpen}/> / <FontAwesomeIcon icon={faLock}/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
