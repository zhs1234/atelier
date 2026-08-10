import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Waves } from 'lucide-react'

type Props = {
  unlocked: boolean
}

function createNoiseBuffer(ctx: AudioContext, seconds = 2) {
  const len = ctx.sampleRate * seconds
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

export default function AmbientMusic({ unlocked }: Props) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [volume, setVolume] = useState(0.35)

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const nodesRef = useRef<AudioNode[]>([])
  const intervalsRef = useRef<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const volumeRef = useRef(volume)
  const playingRef = useRef(false)

  useEffect(() => {
    volumeRef.current = volume
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(
        playingRef.current ? volume : 0,
        ctxRef.current.currentTime,
        0.08,
      )
    }
  }, [volume])

  const stopGraph = useCallback(() => {
    intervalsRef.current.forEach((id) => window.clearInterval(id))
    intervalsRef.current = []
    nodesRef.current.forEach((n) => {
      try {
        if ('stop' in n && typeof (n as OscillatorNode).stop === 'function') {
          ;(n as OscillatorNode).stop()
        }
        n.disconnect()
      } catch {
        /* noop */
      }
    })
    nodesRef.current = []
  }, [])

  const buildGraph = useCallback(async () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!ctxRef.current) ctxRef.current = new AC()
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') await ctx.resume()

    stopGraph()

    const master = ctx.createGain()
    master.gain.value = 0
    masterRef.current = master

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.82
    analyserRef.current = analyser

    master.connect(analyser)
    analyser.connect(ctx.destination)

    // Soft noise bed
    const noise = ctx.createBufferSource()
    noise.buffer = createNoiseBuffer(ctx, 3)
    noise.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 420
    noiseFilter.Q.value = 0.5
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.03
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)
    noise.start()
    nodesRef.current.push(noise, noiseFilter, noiseGain)

    // Drone pads — minor ambient chord
    const drones = [
      { f: 55, g: 0.07, type: 'sine' as OscillatorType },
      { f: 82.5, g: 0.045, type: 'sine' as OscillatorType },
      { f: 110, g: 0.035, type: 'triangle' as OscillatorType },
      { f: 164.8, g: 0.02, type: 'sine' as OscillatorType },
      { f: 220, g: 0.012, type: 'sine' as OscillatorType },
    ]

    drones.forEach((d, i) => {
      const osc = ctx.createOscillator()
      osc.type = d.type
      osc.frequency.value = d.f

      const lfo = ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = 0.04 + i * 0.018
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = d.f * 0.004
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)

      const g = ctx.createGain()
      g.gain.value = d.g

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 600 + i * 180

      osc.connect(filter)
      filter.connect(g)
      g.connect(master)
      osc.start()
      lfo.start()
      nodesRef.current.push(osc, lfo, lfoGain, g, filter)
    })

    // Sparse high shimmer tones
    const scale = [329.63, 392.0, 440.0, 493.88, 587.33, 659.25]
    const shimmer = () => {
      if (!ctxRef.current || !masterRef.current || !playingRef.current) return
      const c = ctxRef.current
      const osc = c.createOscillator()
      osc.type = 'sine'
      const note = scale[Math.floor(Math.random() * scale.length)]
      osc.frequency.value = note * (Math.random() > 0.5 ? 1 : 2)

      const g = c.createGain()
      const now = c.currentTime
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.012 + Math.random() * 0.01, now + 0.8)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4 + Math.random() * 3)

      const f = c.createBiquadFilter()
      f.type = 'highpass'
      f.frequency.value = 400

      osc.connect(f)
      f.connect(g)
      g.connect(masterRef.current)
      osc.start(now)
      osc.stop(now + 8)
      nodesRef.current.push(osc, g, f)
    }

    const shimmerId = window.setInterval(() => {
      if (Math.random() > 0.35) shimmer()
    }, 2800)
    intervalsRef.current.push(shimmerId)
    shimmer()

    setReady(true)
  }, [stopGraph])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if (!canvas || !analyser) {
      rafRef.current = requestAnimationFrame(draw)
      return
    }

    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)

    const buf = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(buf)

    ctx2d.clearRect(0, 0, w, h)

    const bars = 24
    const gap = 3
    const barW = (w - gap * (bars - 1)) / bars
    const step = Math.floor(buf.length / bars)

    for (let i = 0; i < bars; i++) {
      let sum = 0
      for (let j = 0; j < step; j++) sum += buf[i * step + j]
      const avg = sum / step / 255
      const bh = Math.max(2, avg * h * 0.92)
      const x = i * (barW + gap)
      const y = (h - bh) / 2

      const grad = ctx2d.createLinearGradient(x, y, x, y + bh)
      grad.addColorStop(0, 'rgba(232, 255, 71, 0.95)')
      grad.addColorStop(1, 'rgba(232, 255, 71, 0.25)')
      ctx2d.fillStyle = playingRef.current ? grad : 'rgba(242, 240, 235, 0.18)'
      ctx2d.beginPath()
      const r = Math.min(barW / 2, 2)
      ctx2d.roundRect(x, y, barW, bh, r)
      ctx2d.fill()
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  useEffect(() => {
    return () => {
      stopGraph()
      cancelAnimationFrame(rafRef.current)
      ctxRef.current?.close().catch(() => undefined)
    }
  }, [stopGraph])

  const toggle = async () => {
    if (!unlocked) return

    if (!ready || !ctxRef.current) {
      await buildGraph()
    }

    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    if (ctx.state === 'suspended') await ctx.resume()

    if (playingRef.current) {
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25)
      playingRef.current = false
      setPlaying(false)
      window.setTimeout(() => {
        if (!playingRef.current) stopGraph()
      }, 600)
    } else {
      if (nodesRef.current.length === 0) await buildGraph()
      masterRef.current?.gain.setTargetAtTime(volumeRef.current, ctx.currentTime, 0.4)
      playingRef.current = true
      setPlaying(true)
      setExpanded(true)
    }
  }

  if (!unlocked) return null

  return (
    <div className={`music-dock${expanded || playing ? ' open' : ''}${playing ? ' playing' : ''}`}>
      <button
        type="button"
        className="music-toggle"
        onClick={toggle}
        data-cursor={playing ? '静音' : '播放'}
        aria-label={playing ? '暂停氛围音' : '播放氛围音'}
      >
        <span className="music-toggle-ring" />
        {playing ? <Volume2 size={16} strokeWidth={1.8} /> : <VolumeX size={16} strokeWidth={1.8} />}
      </button>

      <div className="music-panel">
        <div className="music-meta">
          <div className="music-label">
            <Waves size={12} strokeWidth={1.8} />
            空谷余音
          </div>
          <div className="music-title">{playing ? '弦已动 · 声正远' : '一触即鸣'}</div>
        </div>

        <canvas ref={canvasRef} className="music-wave" aria-hidden="true" />

        <div className="music-controls">
          <input
            type="range"
            className="music-volume"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            data-cursor="音量"
            aria-label="音量"
            disabled={!playing}
          />
          <button
            type="button"
            className="music-expand"
            onClick={() => setExpanded((v) => !v)}
            data-cursor="收起"
            aria-label="收起面板"
          >
            {expanded ? '收起' : '展开'}
          </button>
        </div>
      </div>
    </div>
  )
}
