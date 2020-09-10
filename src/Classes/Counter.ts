export default class Counter {
  constructor(startingValue:number=0) {
    this.count = startingValue
  }

  count:number = 0

  increment = ():number => ++this.count
}
