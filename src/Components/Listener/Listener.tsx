import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./listener.scss"

interface Props {
  generator: "counter" | "rng",
  listSize: number,
  seed: number,
  broadcasterValue: number,
}

interface State {
  list: number[],
  locked: boolean,
}

export default class Listener extends React.Component<Props,State> {
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
    if(prevProps.generator !== this.props.generator) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        list: this.generateList([]),
        locked: true,
      })
    }
    else if(prevProps.broadcasterValue !== this.props.broadcasterValue) { //if the broadcaster value changed
      setTimeout(
        () => this.verifyValue(this.props.broadcasterValue),
        1000
      )
    }
  }

  generateList = (list:number[]):number[] => {
    //while the list is too short
    while(list.length < this.props.listSize) {
      list.push(this.valueGenerator()) //push a newly generated value
    }

    return list
  }

  verifyValue = (value:number) => {
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

  render() {
    const {
      broadcasterValue,
    } = this.props

    const {
      locked,
    } = this.state

    const status = locked ? "Locked" : "Unlocked"

    return (
      <div className="listener">
        <div className={"status " + status}>{status} <FontAwesomeIcon icon={locked ? faLock : faLockOpen}/></div>
        <br/>

        <b>Generated List of Valid Numbers</b>
        <div>
          {this.state.list.map(value =>
            <div className={"value" + (value===broadcasterValue?" valid":"")}>{value}</div>
          )}
        </div>
      </div>
    )
  }
}
