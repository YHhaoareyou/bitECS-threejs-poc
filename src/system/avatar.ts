// @ts-nocheck
import { defineQuery } from "bitecs"
import { TransformComponent, AvatarComponent } from "../components"
import { World } from "../model/World"
import { VRMHumanBoneName } from '@pixiv/three-vrm';

export const avatarQuery = defineQuery([AvatarComponent])

export const avatarSystem = (world: World) => {
  const { time: { delta, elapsed } } = world
  const ents = avatarQuery(world)
  for (let i = 0; i < ents.length; i++) {
    const e = ents[i]
    const avatar = world.avatars.get(e)
    if (!avatar) continue;

    AvatarComponent.hips.transform.position.x[e] += Math.sin(elapsed * 0.001) * 0.01
    AvatarComponent.hips.transform.position.z[e] += Math.cos(elapsed * 0.001) * 0.01
    
    AvatarComponent.hips.transform.rotation.y[e] += delta * 0.001
    avatar.humanoid.getRawBoneNode(VRMHumanBoneName.Hips).rotation._onChangeCallback();
    AvatarComponent.rightShoulder.transform.rotation.z[e] = Math.cos(elapsed * 0.001) + 1
    avatar.humanoid.getRawBoneNode(VRMHumanBoneName.RightShoulder).rotation._onChangeCallback();
  }
  return world
}
