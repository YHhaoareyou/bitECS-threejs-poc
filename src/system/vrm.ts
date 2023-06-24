import { World } from "../model/World";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

export const vrmSystem = (world: World) => {
  const loader = new GLTFLoader();

  // Install GLTFLoader plugin
  loader.register((parser) => {
    return new VRMLoaderPlugin(parser);
  });

  loader.load(
    // URL of the VRM you want to load
    '/dist/test.vrm',

    // called when the resource is loaded
    (gltf) => {
      // retrieve a VRM instance from gltf
      const vrm = gltf.userData.vrm;

      // add the loaded vrm to the scene
      world.scene.add(vrm.scene);

      // deal with vrm features
      console.log(vrm);
    },

    // called while loading is progressing
    (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),

    // called when loading has errors
    (error) => console.error(error),
  );

  return world
}