import type { Group } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import loaderGlbWorker from '../woker/loadGlb'
import { loadFbx, loadGlb } from './load/modelLoad'

class ModelLoader {
  /**
   * load gltf model
   * @param url
   * @param onLoad
   * @param onProgress
   * @param onError
   * @returns
   */
  public loadGLTF(url: string,
    onLoad?: (result: GLTF) => GLTF,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    return loadGlb(url, onLoad, onProgress, onError)
  }

  /**
   * load gltf model in worker
   * TODO: 测试
   * @param url
   */
  public loadGLTFWorker(url: string, cb: (result: GLTF) => void) {
    const loadGlbWorker = new Worker (
      URL.createObjectURL (new Blob ([`(${loaderGlbWorker.toString()})('${url}')`])),
    )

    loadGlbWorker.onmessage = (event) => {
      cb(event.data)
      loadGlbWorker.terminate()
    }

    loadGlbWorker.onerror = (err) => {
      console.error(err)
    }

    loadGlbWorker.onmessageerror = (err) => {
      console.error(err)
    }
  }

  /**
   * fbx model loader
   * @param url
   * @param onLoad
   * @param onProgress
   * @param onError
   */
  public loadFbx(url: string,
    onLoad?: (result: Group) => Group,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void) {
    return loadFbx(url, onLoad, onProgress, onError)
  }

  /**
   * load fbx model in worker
   * @param url
   * @param cb
   */
  public loadFbxWorker(url: string, cb: (result: Group) => void) {}

  /**
   * parse fbx buffer
   * @param buffer
   * @param path
   * @returns
   */
  public parseFbxBuffer(buffer: ArrayBuffer | string, path: string) {
    return new FBXLoader().parse(buffer, path)
  }
}

export default ModelLoader