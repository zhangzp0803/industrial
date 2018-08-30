import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    token: 'DID4u34N2023-2388ew-zfs-3UID-asdf'
  },
  specialist: {
    token: 'DID4u34N2023-adsaf-zfs-3UID-asdf'
  },
  user: {
    token: 'DID4u34N2023-asdfdksds-3UID-asdf'
  }
}

const tokenMap = {
  'DID4u34N2023-2388ew-zfs-3UID-asdf': {
    roles: ['admin'],
    token: 'DID4u34N2023-2388ew-zfs-3UID-asdf',
    name: 'Super Admin'
  },
  'DID4u34N2023-adsaf-zfs-3UID-asdf': {
    roles: ['specialist'],
    token: 'DID4u34N2023-adsaf-zfs-3UID-asdf',
    name: 'specialist'
  },
  'DID4u34N2023-asdfdksds-3UID-asdf': {
    roles: ['user'],
    token: 'DID4u34N2023-asdfdksds-3UID-asdf',
    name: 'user'
  }
}


export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  validUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username] ? true : false
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (tokenMap[token]) {
      return tokenMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
