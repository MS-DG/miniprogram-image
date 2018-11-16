const _ = require('./utils')

let componentId
let component

beforeAll(async () => {
  componentId = await _.load('index', 'img')
})

test('render', async () => {
  component = _.render(componentId, {
    src: 'https://avatars1.githubusercontent.com/u/6290356',
    mode: "scaleToFill",
    lazyLoad: true,
    // imgThumb: 'https://avatars1.githubusercontent.com/u/6290356?s=32',
    // imgSrc: 'https://avatars1.githubusercontent.com/u/6290356',
    // imgMode: 'scaleToFill',
    // lazy: true,
  })

  const parent = document.createElement('img')

  parent.dataset.thumb = "https://avatars1.githubusercontent.com/u/6290356?s=32"
  component.attach(parent)

  console.log(component.dom)
  expect(_.match(component.dom,
`<image
    class="Img-thumbnail"
    mode="scaleToFill"
    lazy-load="true"
    src="https://avatars1.githubusercontent.com/u/6290356?s=32"
    bind:error="onImageError"
    bind:load="onImageLoad"
    data-type="thumb"
    />
<image
    class="Img-data"
    hidden="true"
    lazy-load="true"
    mode="scaleToFill"
    src="https://avatars1.githubusercontent.com/u/6290356"
    bind:error="onImageError"
    bind:load="onImageLoad"
    data-type="data"
    />
`)).toBe(true)
})
