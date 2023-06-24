import { addEntity, addComponent } from "bitecs"
import * as THREE from "three"
import { TransformComponent, AvatarComponent } from "./components"
import { createObject3DEntity } from "./factory/createObject3DEntity"
import { createAvatarEntity } from "./factory/createAvatarEntity"
import { createWorld } from "./factory/createWorld"
import { pipeline } from "./pipeline"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils, VRMHumanBoneName, VRMExpressionPresetName } from '@pixiv/three-vrm';

const world = createWorld()


const parent = createObject3DEntity(world, new THREE.BoxGeometry(100,100,100))
addComponent(world, TransformComponent, parent.eid)
world.objects.set(parent.eid, parent)
world.scene.add(parent)

for (let i = 1; i <= 10; i++) {
  const size = 10 * (10-i)
  const obj3d = createObject3DEntity(world, new THREE.BoxGeometry(size,size,size))
  addComponent(world, TransformComponent, obj3d.eid)
  world.objects.set(obj3d.eid, obj3d)
  let last = world.objects.get(obj3d.eid-1)
  if (!last) parent.add(obj3d)
  else last.add(obj3d)
}

// renderer
// const renderer = new THREE.WebGLRenderer();
world.renderer.outputEncoding = THREE.sRGBEncoding;
world.renderer.setSize( window.innerWidth, window.innerHeight );
world.renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( world.renderer.domElement );

// camera
// const camera = new THREE.PerspectiveCamera( 30.0, window.innerWidth / window.innerHeight, 0.1, 20.0 );
world.camera.position.set( 0.0, 1.0, 5.0 );

// camera controls
const controls = new OrbitControls( world.camera, world.renderer.domElement );
controls.screenSpacePanning = true;
controls.target.set( 0.0, 1.0, 0.0 );
controls.update();

// scene
// const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1.0, 1.0, 1.0 ).normalize();
world.scene.add( light );

// gltf and vrm
let currentVrm: any = undefined;
const loader = new GLTFLoader();
loader.crossOrigin = 'anonymous';

loader.register( ( parser ) => {
  return new VRMLoaderPlugin( parser );
} );

loader.load('./dist/test.vrm', ( gltf ) => {
    const vrm = gltf.userData.vrm;
    const avatar = createAvatarEntity(world, vrm);
    addComponent(world, AvatarComponent, avatar.eid);
    world.avatars.set(avatar.eid, avatar)

    // AvatarComponent.vrm[eid] = vrm;
    // AvatarComponent.hips[eid] = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips);
    // AvatarComponent.head[eid] = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Head);
    // AvatarComponent.leftHand[eid] = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.LeftHand);
    // AvatarComponent.rightHand[eid] = vrm.humanoid.getRawBoneNode(VRMHumanBoneName.RightHand);

    // calling these functions greatly improves the performance
    VRMUtils.removeUnnecessaryVertices( gltf.scene );
    VRMUtils.removeUnnecessaryJoints( gltf.scene );

    // Disable frustum culling
    vrm.scene.traverse( ( obj: any ) => {
      obj.frustumCulled = false;
    } );

    currentVrm = vrm;

    vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips).rotation.y = Math.PI;
    vrm.humanoid.getRawBoneNode(VRMHumanBoneName.LeftUpperArm).rotation.x = 0.6;
    vrm.humanoid!.getRawBoneNode(VRMHumanBoneName.LeftLowerArm)!.rotation.x = 0.8;
    vrm.humanoid!.getRawBoneNode(VRMHumanBoneName.LeftLowerArm)!.rotation.y = -1.;
    vrm.humanoid!.getRawBoneNode(VRMHumanBoneName.LeftHand)!.rotation.y = -0.5;
    vrm.humanoid!.getRawBoneNode(VRMHumanBoneName.RightUpperArm)!.rotation.z = -1.3;
    
    vrm.expressionManager!.setValue(VRMExpressionPresetName.Happy, .7);
    vrm.expressionManager!.setValue(VRMExpressionPresetName.Sad, .2);
    vrm.expressionManager!.update();
    
    console.log( vrm );
    world.scene.add( vrm.scene );
  },
  ( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
  ( error ) => console.error( error )
);

// helpers
const gridHelper = new THREE.GridHelper( 10, 10 );
world.scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
world.scene.add( axesHelper );

// animate
const clock = new THREE.Clock();
clock.start();

function animate() {
  // update vrm components
  if ( currentVrm ) {
    // currentVrm.update( clock.getDelta() );
    // currentVrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips).rotation.y += clock.getDelta();
    // TransformComponent.position.x[e] += Math.sin(clock.getDelta()) / 30
    // TransformComponent.position.y[e] += Math.cos(clock.getDelta()) / 30
    // TransformComponent.position.z[e] += Math.cos(clock.getDelta()) / 30
  }
  // render
  world.renderer.render( world.scene, world.camera );

}

const update = () => {

  requestAnimationFrame( update )

  pipeline(world)
  animate()
}

update()