import seedrandom from "seedrandom"
import Counter from "Classes/Counter"

export type GeneratorType = "counter" | "rng" | "openSesame"

export type ValueGeneratorType = () => string

export default function getValueGenerator(
  generator: GeneratorType,
  seed: number,
):ValueGeneratorType {
  if(generator === "openSesame") {
    return () => "Open Sesame"
  }
  else if(generator === "rng") {
    const rng = seedrandom(seed.toString())
    return () => (1000000000000000000*rng()).toString()
  }

  const counter = new Counter()
  return () => counter.increment().toString()
}
