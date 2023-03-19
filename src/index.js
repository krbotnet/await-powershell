const { spawn } = require('child_process')
const { BufferList } = require('bl')

module.exports = (args) => {
  const items = args.split(' ')
  const ps = spawn('powershell', items)

  let stdout, stderr

  const chkConverToJson = () => {
    const data = items.toString().toUpperCase()
    if (
      !data.includes('Out-File'.toUpperCase()) &&
      data.includes('ConvertTo-Json'.toUpperCase())
    ) {
      return true
    } else {
      return false
    }
  }

  if (ps.stdout) {
    stdout = new BufferList()
    ps.stdout.on('data', (data) => {
      stdout.append(data)
    })
  }

  if (ps.stderr) {
    stderr = new BufferList()
    ps.stderr.on('data', (data) => {
      stderr.append(data)
    })
  }

  const result = new Promise((resolve, reject) => {
    ps.on('close', (code) => {
      if (code === 0) {
        const data = stdout.toString()
        chkConverToJson() ? resolve(JSON.parse(data)) : resolve(data)
      } else {
        const error = new Error(`code: ${code}, reason: ${stderr}`)
        reject(error.message.toString())
      }
    })
  })
  return result
}
