import IPFS from 'ipfs'

export function createDaemon (repo = '/tmp/paperhub') {
  const ipfs = new IPFS(repo)

  return new Promise((resolve, reject) => {
    ipfs.init({}, (err) => {
      if (err) {
        if (err.message === 'repo already exists') {
          return resolve()
        }
        return reject(err)
      }
      resolve()
    })
  })
    .then(() => new Promise((resolve, reject) => {
      ipfs.goOnline(() => resolve(ipfs))
    }))
    .then((id) => new Promise((resolve, reject) => {
      ipfs.config.show((err, config) => {
        if (err) return reject(err)
        resolve(config)
      })
    }))
    .then(() => new Promise((resolve, reject) => {
      ipfs.id((err, id) => {
        if (err) return reject(err)
        resolve(id)
      })
    }))
    .then((id) => new Promise((resolve, reject) => {
      ipfs.config.show((err, config) => {
        if (err) return reject(err)
        const signallingServer = '/libp2p-webrtc-star/ip4/178.62.241.75/tcp/9090/ws'
        config.Addresses.Swarm = [
          `${signallingServer}/ipfs/${id.ID}`
        ]

        ipfs.config.replace(config, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    }))
    .then(() => new Promise((resolve, reject) => {
      ipfs.goOffline(resolve)
    }))
    .then(() => new Promise((resolve, reject) => {
      ipfs.goOnline(() => resolve(ipfs))
    }))
    .then(() => new Promise((resolve, reject) => {
      ipfs.id((err, id) => {
        if (err) return reject(err)
        resolve(id)
      })
    }))
    .then((id) => new Promise((resolve, reject) => {
      ipfs.config.show((err, config) => {
        if (err) return reject(err)
        resolve(config)
      })
    }))
    .then(() => ipfs)
}
