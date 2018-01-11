const gitHubUser = username => {
  return {
    url: 'https://github.com/' + username,
    image: 'https://github.com/' + username + '.png'
  }
}

const facebookUser = FBID => {
  return {
    url: 'https://www.facebook.com/' + FBID,
    image: 'https://graph.facebook.com/' + FBID + '/picture/?height=200&width=200'
  }
}

const twitterUser = screenName => {
  return {
    url: 'https://twitter.com/' + screenName,
    image: 'https://twitter.com/' + screenName + '/profile_image?size=original'
  }
}

module.exports = {
  gitHubUser,
  facebookUser,
  twitterUser
}
