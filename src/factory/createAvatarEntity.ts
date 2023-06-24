// @ts-nocheck
import { addEntity, IWorld } from "bitecs"
import { AvatarComponent } from "../components"
import { AvatarEntity } from "../model/AvatarEntity"
import { VRM } from "@pixiv/types-vrm-0.0"
import { VRMHumanBoneName } from '@pixiv/three-vrm';

export const createAvatarEntity = (
  world: IWorld,
  vrm: VRM
): AvatarEntity => {

  const eid = addEntity(world)

  const model = vrm as AvatarEntity
  const bone = model.humanoid.getRawBoneNode(VRMHumanBoneName.Hips);
  const rightShoulderBone = model.humanoid.getRawBoneNode(VRMHumanBoneName.RightShoulder);
  
  model.eid = eid

  // position
  Object.defineProperty(bone.position, 'eid', { get: () => eid })
  Object.defineProperty(bone.position, 'store', { get: () => AvatarComponent.hips.transform.position })

  Object.defineProperty(bone.position, 'x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(bone.position, 'y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(bone.position, 'z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  Object.defineProperty(rightShoulderBone.position, 'eid', { get: () => eid })
  Object.defineProperty(rightShoulderBone.position, 'store', { get: () => AvatarComponent.rightShoulder.transform.position })
  Object.defineProperty(rightShoulderBone.position, 'x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(rightShoulderBone.position, 'y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(rightShoulderBone.position, 'z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  // rotation
  Object.defineProperty(bone.rotation, 'eid', { get: () => eid })
  Object.defineProperty(bone.rotation, 'store', { get: () => AvatarComponent.hips.transform.rotation })

  Object.defineProperty(bone.rotation, '_x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(bone.rotation, '_y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(bone.rotation, '_z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  Object.defineProperty(rightShoulderBone.rotation, 'eid', { get: () => eid })
  Object.defineProperty(rightShoulderBone.rotation, 'store', { get: () => AvatarComponent.rightShoulder.transform.rotation })
  Object.defineProperty(rightShoulderBone.rotation, '_x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(rightShoulderBone.rotation, '_y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(rightShoulderBone.rotation, '_z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  // scale
  // Object.defineProperty(model.scale, 'eid', { get: () => eid })
  // Object.defineProperty(model.scale, 'store', { get: () => TransformComponent.scale })

  // Object.defineProperty(model.scale, 'x', {
  //   get () { return this.store.x[this.eid] },
  //   set (n) { this.store.x[this.eid] = n }
  // })
  // Object.defineProperty(model.scale, 'y', {
  //   get () { return this.store.y[this.eid] },
  //   set (n) { this.store.y[this.eid] = n }
  // })
  // Object.defineProperty(model.scale, 'z', {
  //   get () { return this.store.z[this.eid] },
  //   set (n) { this.store.z[this.eid] = n }
  // })

  return model
}