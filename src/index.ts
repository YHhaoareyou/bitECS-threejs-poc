// @ts-nocheck
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils, VRMHumanBoneName, VRMExpressionPresetName } from '@pixiv/three-vrm';
import { createWorld } from "./factory/createWorld"

const world = createWorld()

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
let currentVrm = undefined;
const loader = new GLTFLoader();
loader.crossOrigin = 'anonymous';

loader.register( ( parser ) => {
  return new VRMLoaderPlugin( parser );
} );

loader.load('./dist/test.vrm', ( gltf ) => {
    const vrm = gltf.userData.vrm;

    // calling these functions greatly improves the performance
    VRMUtils.removeUnnecessaryVertices( gltf.scene );
    VRMUtils.removeUnnecessaryJoints( gltf.scene );

    // Disable frustum culling
    vrm.scene.traverse( ( obj ) => {
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
  requestAnimationFrame( animate );
  // update vrm components
  if ( currentVrm ) {
    // currentVrm.update( clock.getDelta() );
    currentVrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips).rotation.y += clock.getDelta();
  }
  // render
  world.renderer.render( world.scene, world.camera );

}

animate();