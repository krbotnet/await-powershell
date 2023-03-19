## Description

Microsoft Powershell wrapped in a Promise for doing async/await.

## Install

```console
$ npm install await-powershell
$ yarn add await-powershell
```

## Usage

```javascript
const Powershell = require('await-powershell')

;(async () => {
  try {
    const ps = await Powershell('Get-TimeZone')
    console.log(ps)
  } catch (error) {
    console.error(error)
  }
})()
```

or

```javascript
const Powershell = require('await-powershell')

;(async () => {
  await Powershell('Get-TimeZone')
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
})()
```

## License

MIT
