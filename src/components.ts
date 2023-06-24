// @ts-nocheck
import { defineComponent, Types } from "bitecs"
import { VRMHumanBoneName } from '@pixiv/three-vrm';


const { f32, str } = Types

export const Vector3Schema = { x: f32, y: f32, z: f32 }
export const QuaternionSchema = { x: f32, y: f32, z: f32, w: f32 }

export const TransformSchema = { 
  position: Vector3Schema,
  rotation: QuaternionSchema,
  scale: Vector3Schema, 
}

export const BoneSchema = {
  transform: TransformSchema,
  parent: str
}

export const AvatarSchema = { 
  hips: BoneSchema,
  spine: BoneSchema,
  chest: BoneSchema,
  neck: BoneSchema,
  head: BoneSchema,
  leftShoulder: BoneSchema,
  leftUpperArm: BoneSchema,
  leftLowerArm: BoneSchema,
  leftHand: BoneSchema,
  rightShoulder: BoneSchema,
  rightUpperArm: BoneSchema,
  rightLowerArm: BoneSchema,
  rightHand: BoneSchema,
  leftUpperLeg: BoneSchema,
  leftLowerLeg: BoneSchema,
  leftFoot: BoneSchema,
  leftToes: BoneSchema,
  rightUpperLeg: BoneSchema,
  rightLowerLeg: BoneSchema,
  rightFoot: BoneSchema,
  rightToes: BoneSchema,
}

export type Vector3Component = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
}

export type QuaternionComponent = {
  x: Float32Array
  y: Float32Array
  z: Float32Array
  w: Float32Array
}

export type TransformComponentType = {
  position: Vector3Component,
  rotation: QuaternionComponent,
  scale: Vector3Component,
}

export type BoneType = {
  transform: TransformComponentType,
  parent: VRMHumanBoneName,
}

export type AvatarComponentType = {
  hips: BoneType,
  spine: BoneType,
  chest: BoneType,
  neck: BoneType,
  head: BoneType,
  leftShoulder: BoneType,
  leftUpperArm: BoneType,
  leftLowerArm: BoneType,
  leftHand: BoneType,
  rightShoulder: BoneType,
  rightUpperArm: BoneType,
  rightLowerArm: BoneType,
  rightHand: BoneType,
  leftUpperLeg: BoneType,
  leftLowerLeg: BoneType,
  leftFoot: BoneType,
  leftToes: BoneType,
  rightUpperLeg: BoneType,
  rightLowerLeg: BoneType,
  rightFoot: BoneType,
  rightToes: BoneType,
}

export const AvatarComponent = defineComponent<AvatarComponentType>(AvatarSchema)
export const TransformComponent = defineComponent<TransformComponentType>(TransformSchema)
