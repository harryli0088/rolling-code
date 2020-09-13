import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import { TransmitterMessageType } from "Components/Pair/Pair"
import getValueGenerator, { GeneratorType, ValueGeneratorType } from "utils/getValueGenerator"
import "./receiver.scss"

interface Props {
  generator: GeneratorType,
  listSize: number,
  openSesame?: boolean,
  reset: boolean,
  seed: number,
  transmitterMessage: TransmitterMessageType,
}

interface State {
  list: string[],
  locked: boolean,
}

export default class Receiver extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      list: this.generateList([]),
      locked: true,
    }
  }

  componentDidUpdate(prevProps:Props) {
    if(
      prevProps.generator !== this.props.generator
      || prevProps.reset !== this.props.reset
    ) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        list: this.generateList([]),
        locked: true,
      })
    }
    else if(prevProps.transmitterMessage !== this.props.transmitterMessage) { //if the transmitter value changed
      setTimeout(
        () => this.verifyValue(this.props.transmitterMessage.value),
        1000
      )
    }
  }

  generateList = (list:string[]):string[] => {
    //while the list is too short
    while(list.length < this.props.listSize) {
      list.push(this.valueGenerator()) //push a newly generated value
    }

    return list
  }

  verifyValue = (value:string) => {
    const {
      list,
      locked,
    } = this.state

    const index = list.indexOf(value) //check whether the value is in the list

    if(list[index]) { //if the value is in the list
      this.setState({
        list: this.generateList( // generate new values for the list
          list.slice(index + 1) //slice off the beginning of the list, including the value
        ),
      })

      this.setState({locked: !locked})
    }
  }

  getGeneratedValues = () => {
    const {
      openSesame,
      transmitterMessage,
    } = this.props

    if(!this.props.openSesame) {
      return (
        <React.Fragment>
          <b>Generated Passcode List</b>
          <div>
            {this.state.list.map((value, valueIndex) =>
              <div key={valueIndex} className={"value" + (value===transmitterMessage.value?" valid":"")}>{value}</div>
            )}
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    const {
      locked,
    } = this.state

    const status = locked ? "Locked" : "Unlocked"

    return (
      <div className="receiver">
        <div className={"status " + status}>Car is {status} <FontAwesomeIcon icon={locked ? faLock : faLockOpen}/></div>
        <br/>

        {this.getGeneratedValues()}
      </div>
    )
  }
}
