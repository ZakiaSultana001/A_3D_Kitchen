// Import necessary Three.js modules
import * as THREE from 'three';

// Custom shaders for lighting
const vertexShader = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
void main() {
    float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
    gl_FragColor = vec4(0, 0, 0, 1.0) * intensity;
}
`;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 4;
camera.position.y = 1;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

// Create room
const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const wallTexture = new THREE.TextureLoader().load('texture/wall2.jpg');
const floorTexture = new THREE.TextureLoader().load('texture/floor-texture.avif');
const roofTexture = new THREE.TextureLoader().load('texture/roof.jpg');
const windowTexture = new THREE.TextureLoader().load('texture/1.jpg');

const roomMaterials = [
    new THREE.MeshLambertMaterial({ map: windowTexture, side: THREE.BackSide }), // Right face
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide }), // Left face
    new THREE.MeshLambertMaterial({  map: roofTexture, side: THREE.BackSide }), // Top face
    new THREE.MeshLambertMaterial({ map: floorTexture, side: THREE.BackSide }), // Bottom face
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide }), // Front face
    new THREE.MeshLambertMaterial({ map: wallTexture, side: THREE.BackSide })  // Back face
];
const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.position.set(0, 1, 0);
scene.add(room);

// Create fridge
const fridgeGeometry = new THREE.BoxGeometry(1, 3, 1);
const fridgeTexture = new THREE.TextureLoader().load('texture/fridge-door-texture.jpg');
const fridgeMaterial = new THREE.MeshLambertMaterial({ map: fridgeTexture });
const innerTexture = new THREE.TextureLoader().load('texture/inner.jpg');
const innerMaterial = new THREE.MeshLambertMaterial({ map: innerTexture });
const outerTexture = new THREE.TextureLoader().load('texture/F3.jpg');


const fridgeMaterials = [
    fridgeMaterial,         // Right face
    fridgeMaterial,         // Left face
    fridgeMaterial,         // Top face
    fridgeMaterial,         // Bottom face
    innerMaterial, // Front face (inside)
    fridgeMaterial          // Back face
];

const fridge = new THREE.Mesh(fridgeGeometry, fridgeMaterials);
fridge.position.set(4.5, 0, -4.5); 
fridge.castShadow = true; 

// Create fridge door
const doorGeometry = new THREE.BoxGeometry(1, 3, 0.1);//w,h,d
const doorMaterial = new THREE.MeshLambertMaterial({ map: outerTexture });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0, 0.45); 
door.castShadow = true; 


const doorGroup = new THREE.Group();
doorGroup.add(door);
doorGroup.position.set(4.5, 0, -4.4); 

const fridgeGroup = new THREE.Group();
fridgeGroup.add(fridge);
fridgeGroup.add(doorGroup);
scene.add(fridgeGroup);

// Create stove
const stoveWidth = 2; 
const stoveHeight = 2; 
const stoveDepth = 1; 
const stoveGeometry = new THREE.BoxGeometry(stoveWidth, stoveHeight, stoveDepth);
const stoveTexture = new THREE.TextureLoader().load('texture/stove.jpg');

const stoveMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Right face
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Left face
    new THREE.MeshLambertMaterial({ map: stoveTexture }), // Top face 
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Bottom face
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Front face
    new THREE.MeshLambertMaterial({ color: 0x000000 })  // Back face
];

const stove = new THREE.Mesh(stoveGeometry, stoveMaterials);
stove.position.set(4, -1, 4.5); 
stove.castShadow = true; 
scene.add(stove);


const potTopTexture = new THREE.TextureLoader().load('texture/p.png');

// Create pot
const potRadiusTop = 0.23;
const potRadiusBottom = 0.23;
const potHeight = 0.2;
const potRadialSegments = 32; 
const potGeometry = new THREE.CylinderGeometry(potRadiusTop, potRadiusBottom, potHeight, potRadialSegments);
const potMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
const pot = new THREE.Mesh(potGeometry, potMaterial);
pot.position.set(4.1, 0.2, 4.15);
pot.castShadow = true; 
scene.add(pot);

//  a plane geometry for the pot top
const potTopGeometry = new THREE.CircleGeometry(potRadiusTop, potRadialSegments);
const potTopMaterial = new THREE.MeshLambertMaterial({ map: potTopTexture });
const potTop = new THREE.Mesh(potTopGeometry, potTopMaterial);

// Position the pot top slightly above the pot
potTop.position.set(4.1, 0.3, 4.15); 
potTop.rotation.x = -Math.PI / 2; 
scene.add(potTop);

// Create oven
const ovenWidth = 1;
const ovenHeight = 1;
const ovenDepth = 0.5;
const ovenGeometry = new THREE.BoxGeometry(ovenWidth, ovenHeight, ovenDepth);
const ovenTexture = new THREE.TextureLoader().load('texture/oven.jpg');

const ovenMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Right face (black)
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Left face (black)
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Top face (black)
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // Bottom face (black)
    new THREE.MeshLambertMaterial({ map: ovenTexture }), // Front face (oven.jpg image)
    new THREE.MeshLambertMaterial({ color: 0x000000 })  // Back face (black)
];

const oven = new THREE.Mesh(ovenGeometry, ovenMaterials);
oven.position.set(-2, 0.25, -3.5); 
oven.castShadow = true; 
scene.add(oven);


// Create kitchen chimney
const chimneyWidth = 2.4;
const chimneyHeight = 1;
const chimneyDepth = 1;
const chimneyGeometry = new THREE.BoxGeometry(chimneyWidth, chimneyHeight, chimneyDepth);

const chimneyMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
});

const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
chimney.position.set(4, 1.75, 4.5);
chimney.castShadow = true;
scene.add(chimney);

// Create chimney hook (long square box)
const hookWidth = 0.25;
const hookHeight = 1.5;
const hookDepth = 0.5;
const hookGeometry = new THREE.BoxGeometry(hookWidth, hookHeight, hookDepth);

const hookMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
});

const hook = new THREE.Mesh(hookGeometry, hookMaterial);
hook.position.set(4, 2.5, 4.5);
hook.castShadow = true;
scene.add(hook);


// // Create kitchen chimney
// const chimneyWidth = 2.4;
// const chimneyHeight = 1;
// const chimneyDepth = 1;
// const chimneyGeometry = new THREE.BoxGeometry(chimneyWidth, chimneyHeight, chimneyDepth);
// // Textures
// const netTexture = new THREE.TextureLoader().load('texture/net.jpg');

// // Materials
// const chimneyMaterials = [
//     new THREE.MeshLambertMaterial({ color: 0x000000 }), // Right face
//     new THREE.MeshLambertMaterial({ color: 0x000000 }), // Left face
//     new THREE.MeshLambertMaterial({ color: 0x000000 }), // Top face
//     new THREE.MeshLambertMaterial({ map: netTexture }), // Bottom face
//     new THREE.MeshLambertMaterial({ color: 0x000000 }), // Front face (net texture)
//     new THREE.MeshLambertMaterial({ color: 0x000000 })  // Back face
// ];

// const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterials);
// chimney.position.set(4, 1.75, 4.5); 
// chimney.castShadow = true; 
// scene.add(chimney);

// // Create chimney hook (long square box)
// const hookWidth = 0.25; 
// const hookHeight = 1.5; 
// const hookDepth = 0.5; 
// const hookGeometry = new THREE.BoxGeometry(hookWidth, hookHeight, hookDepth);
// const hookMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });

// const hook = new THREE.Mesh(hookGeometry, hookMaterial);
// hook.position.set(4, 2.5, 4.5); 
// hook.castShadow = true; 
// scene.add(hook);

// Create cabinet
const cabinetWidth = 2; 
const cabinetHeight = 1; 
const cabinetDepth = 0.5; 
const cabinetGeometry = new THREE.BoxGeometry(cabinetWidth, cabinetHeight, cabinetDepth);
const cabinetTexture = new THREE.TextureLoader().load('texture/cabinet.jpg');

const cabinetMaterials = [
    new THREE.MeshLambertMaterial({ color: 0xffffff}), // Right face 
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // Left face (white)
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // Top face (white)
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // Bottom face (white)
    new THREE.MeshLambertMaterial({ map: cabinetTexture  }), // Front face 
    new THREE.MeshLambertMaterial({ color: 0xffffff})  // Back face (white)
];

const cabinet1 = new THREE.Mesh(cabinetGeometry, cabinetMaterials);
cabinet1.position.set(-3.5, 2, -4.5); 
cabinet1.castShadow = true; 

// Create second cabinet
const cabinet2 = new THREE.Mesh(cabinetGeometry, cabinetMaterials);
cabinet2.position.set(-1.9, 2, -4.5);
cabinet2.castShadow = true; 

// Create third cabinet
const cabinet3 = new THREE.Mesh(cabinetGeometry, cabinetMaterials);
cabinet3.position.set(0, 2, -4.5);
cabinet3.castShadow = true;

// Create fourth cabinet
const cabinet4 = new THREE.Mesh(cabinetGeometry, cabinetMaterials);
cabinet4.position.set(1.9, 2, -4.5); 
cabinet4.castShadow = true; 

// Add cabinets to the scene
scene.add(cabinet1);
scene.add(cabinet2);
scene.add(cabinet3);
scene.add(cabinet4);



// texture for the mat
const matTexture = new THREE.TextureLoader().load('texture/mat.png');

// Create a round mat
const matRadius = 1.5; 
const matSegments = 32; 
const matGeometry = new THREE.CircleGeometry(matRadius, matSegments);
const matMaterial = new THREE.MeshLambertMaterial({ map: matTexture });

// Create the mat mesh
const mat = new THREE.Mesh(matGeometry, matMaterial);


mat.position.set(0, -1.49, 0); 
mat.rotation.x = -Math.PI / 2; // Rotate to make it horizontal -90


scene.add(mat);

// Create table top
const tableTopWidth = 5;
const tableTopDepth = 1;
const tableTopHeight = 0.1;
const tableTopGeometry = new THREE.BoxGeometry(tableTopWidth, tableTopHeight, tableTopDepth);
const tableTopTexture = new THREE.TextureLoader().load('texture/table-texture.jpg');
const tableTopMaterial = new THREE.MeshLambertMaterial({ map: tableTopTexture });
const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
tableTop.position.set(-2.5, -0.5, -4); 
scene.add(tableTop);

// Create table legs
const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
const legMaterial = new THREE.MeshLambertMaterial({ map: tableTopTexture });

// Leg 1
const leg1 = new THREE.Mesh(legGeometry, legMaterial);
leg1.position.set(-0.5, -1, -3.6);
scene.add(leg1);

// Leg 2
const leg2 = new THREE.Mesh(legGeometry, legMaterial);
leg2.position.set(-0.5,-1, -4.7);
scene.add(leg2);

// Leg 3
const leg3 = new THREE.Mesh(legGeometry, legMaterial);
leg3.position.set(-4.4, -1, -3.6);
scene.add(leg3);

// Leg 4
const leg4 = new THREE.Mesh(legGeometry, legMaterial);
leg4.position.set(-4.4, -1, -4.7);
scene.add(leg4);


// Create steam particles
const particleCount = 50;
const particles = new THREE.BufferGeometry();//Buffer geometry to store particle data.
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const amplitudes = new Float32Array(particleCount); // Added amplitude for wave effect

const steamRadius = 0.15; // Reduced radius for particle generation

for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * steamRadius;

    positions[i * 3] = Math.cos(angle) * radius; // evenly distributed in X axis
    positions[i * 3 + 1] = 0; // Y
    positions[i * 3 + 2] = Math.sin(angle) * radius; // Z

    velocities[i * 3] = (Math.random() - 0.5) * 0.01; // X velocity
    velocities[i * 3 + 1] = Math.random() * 0.01; // Y velocity
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01; // Z velocity

    amplitudes[i] = Math.random() * 0.02; // Random amplitude for wave effect
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
particles.setAttribute('amplitude', new THREE.BufferAttribute(amplitudes, 1)); // Set amplitude attribute

const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.6
});

const particleSystem = new THREE.Points(particles, particleMaterial);
particleSystem.position.set(4.1, 0.3, 4.15); // Position particles above the pot
scene.add(particleSystem);

// Variables to track fridge door status
let doorOpen = false;
const doorOpenPosition = Math.PI / 2; // Adjust this value as needed

// Event listener for clicking the fridge door
window.addEventListener('click', (event) => {
    event.preventDefault();

    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Raycaster for detecting mouse interaction
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check if the door or fridge is clicked
    const intersects = raycaster.intersectObjects([door, fridge]);
    if (intersects.length > 0) {
        doorOpen = !doorOpen;

        // Animate door opening and closing
        if (doorOpen) {
            // Rotate the door around its local Y-axis
            new TWEEN.Tween(door.rotation)
                .to({ y: door.rotation.y - doorOpenPosition }, 1000) 
                .easing(TWEEN.Easing.Quadratic.InOut) // animation start and end slowly while speeding up in the middle.
                .start();
        } else {
            // Rotate the door back to its initial rotation
            new TWEEN.Tween(door.rotation)
                .to({ y: door.rotation.y + doorOpenPosition }, 1000) 
                .easing(TWEEN.Easing.Quadratic.InOut) // animation start and end slowly while speeding up in the middle.
                .start();
        }
    }
});

// Keyboard arrow key interaction
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            scene.rotation.y += 0.05; // Adjust rotation speed as needed
            break;
        case 'ArrowLeft':
            scene.rotation.y -= 0.05; // Adjust rotation speed as needed
            break;
        case 'ArrowUp':
            scene.position.z += 0.1; // Adjust movement speed as needed
            break;
        case 'ArrowDown':
            scene.position.z -= 0.1; // Adjust movement speed as needed
            break;
        default:
            break;
    }
});

// Create a light source
const light = new THREE.PointLight(0xffffff, 50, 10);
light.position.set(0, 2, 0);
light.castShadow = true; // Enable shadows for the light
scene.add(light);

// Light switch variable
let lightOn = true;
let targetIntensity = 50; // Initial target intensity 
let currentIntensity = 50; // Initial current intensity

// Light intensity adjustment
window.addEventListener('keydown', (event) => {
    if (event.key === 'A') { 
        lightOn = !lightOn;

        if (lightOn) {
            targetIntensity = 80; // Increase intensity to 80
        } else {
            targetIntensity = 20; // Decrease intensity to 20
        }
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);


    if (Math.abs(currentIntensity - targetIntensity) > 0.1) {
        
        currentIntensity += (targetIntensity - currentIntensity) * 0.05; // Adjust the speed of transition here

        // Clamp the intensity to ensure it does not exceed the target
        currentIntensity = THREE.MathUtils.clamp(currentIntensity, 0, 100);

        light.intensity = currentIntensity;
    }

    // Animate door rotation 
    if (doorOpen) {
        if (doorGroup.rotation.y > -doorOpenPosition) {
            doorGroup.rotation.y -= 0.01;
        }
    } else {
        if (doorGroup.rotation.y < 0) {
            doorGroup.rotation.y += 0.01;
        }
    }

    // Update steam particles position 
    const positions = particleSystem.geometry.attributes.position.array;
    const velocities = particleSystem.geometry.attributes.velocity.array;

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += velocities[i * 3 + 1];

        if (positions[i * 3 + 1] > 1) {
            positions[i * 3 + 1] = 0; // Reset Y position when particle reaches the top
        }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();
