window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
    let transitionType = 'normal' // set a default transition type, you could also leave this empty
    // check if navigation activation is defined and use it to get from- and to url:
    if (navigation?.activation?.from && navigation?.activation?.entry) {
      transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry)
    }
    console.log(transitionType)
    e.viewTransition.types.add(transitionType)
  }
})

const determineTransitionType = (from, to) => {
  const currentUrl = from?.url ? new URL(from.url) : null
  const targetUrl = new URL(to.url)
  // get paths:
  let currentPath = currentUrl.pathname
  let targetPath = targetUrl.pathname
	const fromType = getPageType(currentPath)
	const toType = getPageType(targetPath)
	return `${fromType}-to-${toType}`
}

const getPageType = (path) => {
  path = path.replace('/', '')  // remove first /
  const segments = path.split('/') // Split path into segments (/blog/view-transitions would be split in 'blog' and 'view-transitions' f.e.)
  const [firstSegment, secondSegment] = segments
  
  switch (firstSegment) {
    case '':
      return 'home'
    case 'people':
      return secondSegment 
        ? `${firstSegment}-detail`
        : `${firstSegment}-overview`
    default:
      return 'normal'
  }
}