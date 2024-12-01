import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../scss/style.scss';

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
    //メッシュ、ライン、またはポイント ジオメトリの表現
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
function enableExplosion(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer, canvas: HTMLCanvasElement, size: {width: number, height :number }, planets:THREE.Mesh[]) {
    // レイキャスティングは、マウスの選択 (マウスが 3D 空間のどのオブジェクト上にあるかを判断する) などに使用
    const raycaster = new THREE.Raycaster();
    // 2D ベクトルは、順序付けられた数値のペア (x と y のラベルが付けられている) であり、次のようなさまざまなものを表すために使用。
    // ・2D 空間内の点 (つまり、平面上の位置)。
    // ・平面上の方向と長さ。three.js では、長さは常に(0, 0)から(x, y)までのユークリッド距離 (直線距離) となり 、方向も(0, 0)から(x, y)に向かって測定される。
    // ・任意の順序の数字のペア。
    // 2D ベクトルを使用して表現できるものは他にもあります。たとえば、運動量ベクトル、複素数など。ただし、これらは three.js で最も一般的な用途です。
    // Vector2 インスタンスを反復処理すると、対応する順序でそのコンポーネントが生成されます。 (x, y)
    const mouse = new THREE.Vector2();
    const particles: THREE.Points[] = []; // 爆散中のパーティクル群

    // マウスクリック時のイベントリスナー
    renderer.domElement.addEventListener('click', (event) => {
        // マウス位置を正規化
        // getBoundingClientRect:要素の寸法と、そのビューポートに対する相対位置に関する情報を返す
        const rect = canvas.getBoundingClientRect();
        console.log(rect);
        mouse.x = ((event.clientX - rect.left) / size.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / size.height) * 2 + 1;

        // Raycasterでクリックされたオブジェクトを取得
        // 新しい原点と方向で光線を更新
        raycaster.setFromCamera(mouse, camera);
        // scene.children.forEach(item => {
        //     // console.log(item);
        //     if(item instanceof MeshStandardMaterial) {
        //         console.log('inin');
        //     }
        // });
        // レイとの交差をチェックするオブジェクト
        console.log(planets);
        console.log(scene.children);
        const intersects = raycaster.intersectObjects(planets);

        if (intersects.length > 0) {
            const target = intersects[0].object;

            // 爆散エフェクトを作成
            createExplosion(target, scene);
            animateParticles();
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
            if (particle.material instanceof THREE.Material) {
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
    const sunMaterial = new THREE.MeshStandardMaterial({
        color: 0xffa500, // オレンジ系のベース色
        emissive: 0xff4500, // 発光色 (赤みのある色)
        emissiveIntensity: 1.5, // 発光の強さ
        roughness: 0.5, // 表面の粗さ
        metalness: 0.1 // メタリック感
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // 太陽の大きさに基づいて少し大きい半透明の球体を作成
    const glowGeometry = new THREE.SphereGeometry(8.5, 32, 32); // 太陽より少し大きめ
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4500, // 発光色 (オレンジ色)
        transparent: true, // 透明を有効にする
        opacity: 0.2, // 半透明の度合い
    });

    // 半透明の球体メッシュを作成して追加
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // 惑星を格納するデータ
    const planetsData = [
        { size: 2, color: 0x8888ff, orbitRadius: 15, speed: 0.03, offset: { x: 2, y: 0 }  },
        { size: 3, color: 0x00ff00, orbitRadius: 25, speed: 0.02, offset: { x: 7, y: 0 }  },
        { size: 4, color: 0xff0000, orbitRadius: 40, speed: 0.01, offset: { x: 15, y: 0 }  },
        { size: 2.5, color: 0xffa500, orbitRadius: 60, speed: 0.005, offset: { x: 30, y: 0 }  },
        { size: 5, color: 0x8888ff, orbitRadius: 80, speed: 0.003, offset: { x: 45, y: 0 }  },
        { size: 2.5, color: 0x00ff00, orbitRadius: 100, speed: 0.002, offset: { x: 58, y: 0 }  },
        { size: 4, color: 0xff0000, orbitRadius: 130, speed: 0.001, offset: { x: 78, y: 0 }  },
        { size: 2, color: 0xffa500, orbitRadius: 160, speed: 0.0007, offset: { x: 100, y: 0 }  },
    ];

    // 惑星グループ
    const planetGroups: THREE.Group[] = [];
    const planets: THREE.Mesh[] = [];
    planets.push(sun);

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
            color: 0x007eff, // 色
            transparent: true, // 透明の表示許可
            blending: THREE.AdditiveBlending, // ブレンドモード
            side: THREE.DoubleSide, // 表裏の表示設定
            depthWrite: false // デプスバッファへの書き込み可否
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
    enableExplosion(scene, camera, renderer, canvas, size, planets);
    animate();
}

function shooter () {
    // シーン、カメラ、レンダラーの作成
    const canvas = document.getElementById('canvas3') as HTMLCanvasElement;
    const size = { width: window.innerWidth, height: 600 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, size.width / size.height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true});
    renderer.setSize(size.width, size.height);

    // カメラの位置設定
    camera.position.z = 5;

    const spaceshipGeometry = new THREE.BoxGeometry(1, 1, 2);
    const spaceshipMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
    scene.add(spaceship);

    const spaceshipSpeed = 0.1;
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') spaceship.position.y -= spaceshipSpeed;
        if (event.key === 'ArrowDown') spaceship.position.y += spaceshipSpeed;
        if (event.key === 'ArrowLeft') spaceship.position.x -= spaceshipSpeed;
        if (event.key === 'ArrowRight') spaceship.position.x += spaceshipSpeed;
    });

    function createAsteroid() {
        const asteroidGeometry = new THREE.SphereGeometry(Math.random() + 0.5, 16, 16);
        const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        asteroid.position.set(
            Math.random() * 10 - 5,  // ランダムな位置X
            Math.random() * 10 - 5,  // ランダムな位置Y
            Math.random() * 10 - 5   // ランダムな位置Z
        );
        scene.add(asteroid);
        return asteroid;
    }

    function moveAsteroids() {
        asteroids.forEach(asteroid => {
            asteroid.position.z += 0.05;  // アステロイドをZ軸方向に移動
            if (asteroid.position.z > 5) {
                asteroid.position.z = -5;
                asteroid.position.x = Math.random() * 10 - 5;
                asteroid.position.y = Math.random() * 10 - 5;
            }
        });
    }

    function createBullet() {
        const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.set(spaceship.position.x, spaceship.position.y, spaceship.position.z);
        scene.add(bullet);
        return bullet;
    }

    function moveBullets() {
        bullets.forEach(bullet => {
            bullet.position.z -= 0.2;
        });
    }

    function checkCollisions() {
        bullets.forEach(bullet => {
            asteroids.forEach((asteroid, index) => {
                const distance = bullet.position.distanceTo(asteroid.position);
                if (distance < 1) {  // 衝突判定（弾とアステロイドが接触）
                    scene.remove(asteroid);  // アステロイドを削除
                    scene.remove(bullet);    // 弾を削除
                    asteroids.splice(index, 1);
                    bullets = bullets.filter(b => b !== bullet);
                }
            });
        });
    }

    // 複数のアステロイドを生成
    const asteroids:THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
        asteroids.push(createAsteroid());
    }

    let bullets:THREE.Mesh[] = [];
    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            bullets.push(createBullet());
        }
    });

    function animate() {
        requestAnimationFrame(animate);

        moveAsteroids();  // アステロイドの移動
        moveBullets();    // 弾の移動
        checkCollisions(); // 衝突判定

        renderer.render(scene, camera);
    }
    animate();
}

createSolarTest();
createSolarSystem();
shooter();