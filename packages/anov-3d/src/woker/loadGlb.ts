import { loadGlb } from '../core/load/modelLoad'

const loaderGlbWorker = () => {
  self.addEventListener('message', (e) => {
    const { url } = e.data

    loadGlb(url).then((gltf) => {
      self.postMessage(gltf)
    })
  })
}

export default loaderGlbWorker