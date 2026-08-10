import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.z = 28

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.classList.add('webgl-canvas')

    const count = 1400
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 8 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55
      positions[i3 + 2] = radius * Math.cos(phi) * 0.7

      randomness[i3] = (Math.random() - 0.5) * 2
      randomness[i3 + 1] = (Math.random() - 0.5) * 2
      randomness[i3 + 2] = (Math.random() - 0.5) * 2
      scales[i] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomness, 3))

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#e8ff47') },
        uColor2: { value: new THREE.Color('#f2f0eb') },
      },
      vertexShader: /* glsl */ `
        attribute float aScale;
        attribute vec3 aRandom;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec2 uMouse;
        varying float vAlpha;
        varying float vMix;

        void main() {
          vec3 pos = position;

          float t = uTime * 0.15;
          pos.x += sin(t + aRandom.x * 6.28) * aRandom.y * 0.8;
          pos.y += cos(t * 0.8 + aRandom.y * 6.28) * aRandom.z * 0.6;
          pos.z += sin(t * 0.6 + aRandom.z * 6.28) * aRandom.x * 0.5;

          pos.x += uMouse.x * aRandom.x * 1.8;
          pos.y += uMouse.y * aRandom.y * 1.4;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float size = (aScale * 2.5 + 1.0) * uPixelRatio * (40.0 / -mvPosition.z);
          gl_PointSize = clamp(size, 1.0, 8.0);

          vAlpha = smoothstep(35.0, 8.0, -mvPosition.z) * (0.25 + aScale * 0.55);
          vMix = aScale;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying float vMix;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;

          float glow = smoothstep(0.5, 0.0, d);
          vec3 col = mix(uColor2, uColor, vMix);
          gl_FragColor = vec4(col, vAlpha * glow * glow);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Connecting lines (subtle constellation)
    const lineCount = 180
    const linePositions = new Float32Array(lineCount * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xe8ff47,
      transparent: true,
      opacity: 0.045,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
    window.addEventListener('resize', onResize)

    let raf = 0
    const clock = new THREE.Clock()

    const tick = () => {
      const t = clock.getElapsedTime()
      material.uniforms.uTime.value = t

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      material.uniforms.uMouse.value.set(mouse.x, mouse.y)

      points.rotation.y = t * 0.03 + mouse.x * 0.15
      points.rotation.x = mouse.y * 0.08

      // Update constellation lines from nearby particles
      const posArr = geometry.attributes.position.array as Float32Array
      let li = 0
      for (let i = 0; i < lineCount; i++) {
        const a = Math.floor(Math.random() * count)
        const b = Math.floor(Math.random() * count)
        const ax = posArr[a * 3]
        const ay = posArr[a * 3 + 1]
        const az = posArr[a * 3 + 2]
        const bx = posArr[b * 3]
        const by = posArr[b * 3 + 1]
        const bz = posArr[b * 3 + 2]
        const dist = Math.hypot(ax - bx, ay - by, az - bz)
        if (dist < 6) {
          linePositions[li++] = ax
          linePositions[li++] = ay
          linePositions[li++] = az
          linePositions[li++] = bx
          linePositions[li++] = by
          linePositions[li++] = bz
        } else {
          linePositions[li++] = 0
          linePositions[li++] = 0
          linePositions[li++] = 0
          linePositions[li++] = 0
          linePositions[li++] = 0
          linePositions[li++] = 0
        }
      }
      lineGeo.attributes.position.needsUpdate = true
      lines.rotation.copy(points.rotation)

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" />
}
