import seedrandom from "seedrandom"
import Counter from "Classes/Counter"

export type ValueGeneratorType = () => number

export default function getValueGenerator(
  generator:string,
  seed: number,
):ValueGeneratorType {
  if(generator === "rng") {
    const rng = seedrandom(seed.toString())
    return () => 1000000000000000000*rng()
  }

  return new Counter().increment
}
