import { Object3DEntity } from "./Object3DEntity";
import { AvatarEntity } from "./AvatarEntity";

export type World = {
  objects: Map<number, Object3DEntity>
  avatars: Map<number, AvatarEntity>
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  time: {
    last: number
    delta: number
    elapsed: number
  }
}