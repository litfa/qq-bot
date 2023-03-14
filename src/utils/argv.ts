const map = {
  '-c': 'config',
  '--config': 'config',
  '-p': 'port',
  '--port': 'port'
}

const argvs: {
  config?: string
  [prop: string]: string | number
} = {}
type data = [k: keyof typeof map, v: string | number]

process.argv.map((e) => {
  const [k, v] = e.split('=') as data
  argvs[map[k]] = v
})

export default argvs
