import seedrandom from "seedrandom"
import Counter from "Classes/Counter"

export type ValueGeneratorType = () => number

export default function getValueGenerator(
  generator:string,
  seed: number,
):ValueGeneratorType {
  if(generator === "rng") {
    return seedrandom(seed.toString())
  }

  return new Counter().increment
}
