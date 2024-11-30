import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../scss/style.scss';
import {MeshPhongMaterial, MeshStandardMaterial} from "three";

// シーン(scene)
// 3次元空間を表し、3Dオブジェクトやライトが加えられる。

// カメラ(camera)
// 3次元空間を映し、レンダラーに送って画面に投影する。
// Perspectiveは透視投影(perspective projection)を意味し、対象物を人が見たのと近い表現
// fov: 視野(field of view)またはカメラの用語で画角。写される光景の範囲を角度(度数)で示す。数字が大きいと広角で、写る範囲は広くなるかわり、対象物は相対的に小さくなる。小さい角度は望遠に近づき、対象物が相対的に大きく写る。
// aspect: アスペクト比(画面の縦横比を表す値)で、描画する矩形領域の幅/高さ。矩形領域の比と合わなければ、画像の水平・垂直比が歪む。
// near: オブジェクトを描画するもっとも近い距離。これより近くのオブジェクトは画面に描かれない。
// far: オブジェクトを描画するもっとも遠い距離。これより遠くのオブジェクトは画面に描かれない。

// レンダラー(renderer)
// カメラから受け取った画像を、画面の再描画のたびに更新する。

const appElement = document.querySelector<HTMLDivElement>('#appElement')!;
//
// three.jsセットアップ
//
// 座表軸
const axes = new THREE.AxesHelper();
// シーンを初期化
const scene = new THREE.Scene();
scene.add(axes);

// カメラを初期化
const camera = new THREE.PerspectiveCamera(50, appElement.offsetWidth / appElement.offsetHeight);
camera.position.set(1, 1, 1);
camera.lookAt(scene.position);

// レンダラーの初期化
// antialias:物体の輪郭が滑らかになる
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xf6f5f4, 1.0); // 背景色
//デバイスピクセル比を設定。設定しないとスマホだとぼやけて表示される
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);
// レンダラーをDOMに追加
appElement.appendChild(renderer.domElement);

// カメラコントローラー設定
const orbitControls = new OrbitControls(camera, renderer.domElement);
//垂直方向にどれだけ遠くまで回転できるか、上限。範囲は 0 から Math.PI ラジアンで、デフォルトは Math.PI(円周率)
orbitControls.maxPolarAngle = Math.PI;
//ドリーイン(カメラを被写体に近づけていく撮影方法)できる距離 ( PerspectiveCameraのみ )。デフォルトは 0
orbitControls.minDistance = 0.1;
//ドリーアウトできる距離 ( PerspectiveCameraのみ )。デフォルトは Infinity
orbitControls.maxDistance = 10;
// カメラの自動回転設定
orbitControls.autoRotate = true;
// カメラの自動回転速度
orbitControls.autoRotateSpeed = 1.0;

// 描画ループを開始
renderer.setAnimationLoop(() => {
    // カメラコントローラーを更新
    orbitControls.update();

    // 描画する
    renderer.render(scene, camera);
});


function createSolarTest() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const size = { width: window.innerWidth, height: 500 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        size.width / size.height,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(size.width, size.height);

    //BoxGeometry は、指定された「幅」、「高さ」、「奥行き」を持つ直方体のジオメトリ クラス
    //Segmentsはセグメントの数
    // const geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
    // //マテリアルの色。デフォルトは白 (0xffffff)
    // const material = new THREE.MeshPhongMaterial({ color: 'aqua'});
    // //三角形のポリゴン メッシュベースのオブジェクト を表すクラス
    // const cube = new THREE.Mesh(geometry, material);

    //球体
    const geometry = new THREE.SphereGeometry( 2, 16, 16 );
    const material = new THREE.MeshPhongMaterial( { color: 'aqua' } );
    const sphere = new THREE.Mesh( geometry, material );

    const geometry2 = new THREE.SphereGeometry( 16, 32, 32 );
    const material2 = new THREE.MeshPhongMaterial( { color: 'aqua' } );
    const sphere2 = new THREE.Mesh( geometry2, material2 );

    // 球体3のジオメトリとマテリアル
    const geometry3 = new THREE.SphereGeometry(2, 16, 16);
    const material3 = new THREE.MeshPhongMaterial({ color: 'lime' });
    const sphere3 = new THREE.Mesh(geometry3, material3);

    // グループを作成し、sphere2 をグループの中心として追加
    const group = new THREE.Group();
    group.add(sphere);
    group.add(sphere2);
    scene.add(group);

    const group2 = new THREE.Group();
    group2.add(sphere3);
    scene.add(group2);

    //ライトの位置と方向を表す平面と線で構成 DirectionalLight(色, 光の強さ)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    //3D空間全体に均等に光を当てる AmbientLight(色, 光の強さ)
    const ambientLight = new THREE.AmbientLight('gray');
    //ライトの位置
    directionalLight.position.set(1, 1, 1);
    //シーンにセット
    scene.add(ambientLight);
    scene.add(directionalLight);

    //カメラの位置変更
    camera.position.z = 80;
    camera.rotation.y = 50;
    //球の位置変更
    sphere.position.x = 20;
    sphere3.position.x = 30;
    //角度をつける
    // cube.rotation.x += 0.5;
    // cube.rotation.y += 0.5;
    //描画
    // renderer.render(scene, camera);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const animate = () => {
        //アニメーション
        // cube.rotation.x += 0.5;
        // cube.rotation.x += 0.01;
        // // cube.rotation.y += 0.5;
        // cube.rotation.y += 0.01;
        // グループを回転（早めの周期）
        group.rotation.y += 0.02;
        // グループ2を回転（遅めの周期）
        group2.rotation.y += 0.01;
        //再描画
        renderer.render(scene, camera);
        //ブラウザーにアニメーションを行いたいことを知らせ、指定した関数を呼び出して次の再描画の前にアニメーションを更新することを要求
        requestAnimationFrame(animate);
    };
    createStarrySky(scene);
    animate();
}

function createStarrySky(scene: THREE.Scene) {
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000; // 星の数
    const positions = [];

    // ランダムな位置に星を配置
    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000; // シーン内の範囲
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        positions.push(x, y, z);
    }

    starsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    );

    // 丸い星のテクスチャを作成
    const texture = new THREE.TextureLoader().load('./assets/img/circle.png'); // 小さな白い円の画像

    // 星の素材（丸い点）
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1, // 星のサイズ
        sizeAttenuation: true, // 距離に応じて縮小
        map: texture, // テクスチャを使用
        transparent: true, // テクスチャの透明部分を考慮
        alphaTest: 0.5, // 半透明部分を無視する閾値
    });

    // 星空を作成してシーンに追加
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}
function enableExplosion(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer, canvas: HTMLCanvasElement, size: {width: number, height :number }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const particles: THREE.Points[] = []; // 爆散中のパーティクル群

    // マウスクリック時のイベントリスナー
    renderer.domElement.addEventListener('click', (event) => {
        // マウス位置を正規化
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / size.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / size.height) * 2 + 1;
console.log('click');
        // Raycasterでクリックされたオブジェクトを取得
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
console.log(intersects);
        if (intersects.length > 0) {
            const target = intersects[0].object;

            // 爆散エフェクトを作成
            createExplosion(target, scene);
            scene.remove(target); // 元のオブジェクトを削除
        }
    });

    // 爆散エフェクト作成関数
    function createExplosion(target: THREE.Object3D, scene: THREE.Scene) {
        const geometry = (target as THREE.Mesh).geometry.clone();
        const material = new THREE.PointsMaterial({
            color: 0xff6600,
            size: 0.1,
            transparent: true,
        });

        // 頂点を点群（パーティクル）として爆散
        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);
        particles.push(particlesMesh);

        const velocity = [];
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            velocity.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                )
            );
        }
        particlesMesh.userData.velocity = velocity;
    }

    // 爆散アニメーションの更新
    function animateParticles() {
        particles.forEach((particle, index) => {
            const positions = particle.geometry.attributes.position;
            const velocity = particle.userData.velocity;

            for (let i = 0; i < positions.count; i++) {
                positions.array[i * 3] += velocity[i].x * 0.1; // X軸更新
                positions.array[i * 3 + 1] += velocity[i].y * 0.1; // Y軸更新
                positions.array[i * 3 + 2] += velocity[i].z * 0.1; // Z軸更新
            }
            positions.needsUpdate = true;

            // パーティクルの寿命チェック（透明度を減らす）
            if (particle.material instanceof MeshPhongMaterial || particle.material instanceof MeshStandardMaterial) {
                particle.material.opacity -= 0.01;
                if (particle.material.opacity <= 0) {
                    console.log('in');
                    scene.remove(particle);
                    particles.splice(index, 1);
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function createSolarSystem () {
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const size = { width: window.innerWidth, height: 600 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, size.width / size.height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(size.width, size.height);

    // Raycaster とマウス座標を作成
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();

    // 環境光と太陽光を追加
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // 柔らかい光
    const pointLight = new THREE.PointLight(0xffffff, 1000, 1000); // 太陽光
    pointLight.position.set(0, 0, 0); // 太陽に配置
    scene.add(ambientLight);
    scene.add(pointLight);

    // 太陽
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // 惑星を格納するデータ
    const planetsData = [
        { size: 2, color: 0x8888ff, orbitRadius: 15, speed: 0.03, offset: { x: 2, y: 0 }  },
        { size: 3, color: 0x00ff00, orbitRadius: 25, speed: 0.02, offset: { x: 7, y: 0 }  },
        { size: 4, color: 0xff0000, orbitRadius: 40, speed: 0.01, offset: { x: 15, y: 0 }  },
        { size: 2.5, color: 0xffa500, orbitRadius: 60, speed: 0.005, offset: { x: 30, y: 0 }  },
        { size: 5, color: 0x8888ff, orbitRadius: 80, speed: 0.003, offset: { x: 45, y: 0 }  },
        { size: 2.5, color: 0x00ff00, orbitRadius: 100, speed: 0.002, offset: { x: 55, y: 0 }  },
        { size: 4, color: 0xff0000, orbitRadius: 130, speed: 0.001, offset: { x: 73, y: 0 }  },
        { size: 2, color: 0xffa500, orbitRadius: 160, speed: 0.0007, offset: { x: 90, y: 0 }  },
    ];

    // 惑星グループ
    const planetGroups: THREE.Group[] = [];
    const planets: THREE.Mesh[] = [];

    planetsData.forEach((planet) => {
        // 惑星の作成
        const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: planet.color });
        const sphere = new THREE.Mesh(geometry, material);

        // 軌道の線
        const orbitGeometry = new THREE.RingGeometry(
            planet.orbitRadius - 0.1, // 内半径
            planet.orbitRadius + 0.1, // 外半径
            256
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2; // 軌道を水平に配置
        // 軌道の中心をずらす
        const orbitGroup = new THREE.Group();
        orbitGroup.position.set(planet.offset.x, planet.offset.y, 0);
        orbitGroup.add(orbit);
        scene.add(orbitGroup);

        // 惑星の初期位置をずらす
        const group = new THREE.Group();
        sphere.position.x = planet.orbitRadius;
        group.position.set(planet.offset.x, planet.offset.y, 0);
        group.add(sphere);
        scene.add(group);
        planetGroups.push(group);
        planets.push(sphere);
    });

    // カメラの設定
    camera.position.x = 10;
    camera.position.y = 20;
    camera.position.z = 50;

    // カメラコントロール
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    console.log(planets);
    // マウスクリックイベント
    // function onClick(event: MouseEvent) {
    //     // マウス位置を正規化
    //     const rect = canvas.getBoundingClientRect();
    //     mouse.x = ((event.clientX - rect.left) / size.width) * 2 - 1;
    //     mouse.y = -((event.clientY - rect.top) / size.height) * 2 + 1;
    //
    //     // Raycasterを更新
    //     raycaster.setFromCamera(mouse, camera);
    //
    //     // クリックされたオブジェクトを取得
    //     const intersects = raycaster.intersectObjects(planets);
    //     if (intersects.length > 0) {
    //         const clickedPlanet = intersects[0].object;
    //         console.log('Clicked Planet:', clickedPlanet);
    //
    //         clickedPlanet.scale.set(+1.2, +1.2, +1.2); // クリックした惑星を少し拡大
    //     }
    // }

    // アニメーション
    const animate = () => {
        planetGroups.forEach((group, index) => {
            const planet = planetsData[index];
            // 各グループを回転させる（軌道）
            group.rotation.y += planet.speed;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    createStarrySky(scene);
    // canvas.addEventListener('click', onClick);
    enableExplosion(scene, camera, renderer, canvas, size);
    animate();
}

createSolarTest();
createSolarSystem();