import React, { useEffect, useRef } from 'react'
import bouncingImage from '../../assets/images/contactFormImage.png'

export default function BouncingImage({
  src = bouncingImage, // <- replace with your image path or URL
  alt = '',
  size = 500, // image width in px
  speed = 110, // px per second
}) {
  const panelRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    const img = imgRef.current
    if (!panel || !img) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // start somewhere random, heading in a random diagonal direction
    const angle =
      (Math.random() * 0.5 + 0.25) * Math.PI * (Math.random() < 0.5 ? 1 : -1)
    let vx = Math.cos(angle) * speed * (Math.random() < 0.5 ? 1 : -1)
    let vy = Math.sin(angle) * speed
    let x = Math.random() * 100
    let y = Math.random() * 100

    let bounds = { w: 0, h: 0 }
    const measure = () => {
      const rect = panel.getBoundingClientRect()
      const imgH = img.offsetHeight || size
      bounds = {
        w: Math.max(rect.width - size, 0),
        h: Math.max(rect.height - imgH, 0),
      }
    }
    measure()

    if (reduced) {
      // no motion: park it in the middle
      img.style.transform = `translate3d(${bounds.w / 2}px, ${bounds.h / 2}px, 0)`
      return
    }

    const ro = new ResizeObserver(measure)
    ro.observe(panel)
    img.addEventListener('load', measure)

    let paused = false
    let visible = true
    let last = performance.now()
    let raf

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!paused && visible) {
        x += vx * dt
        y += vy * dt

        if (x <= 0) {
          x = 0
          vx = Math.abs(vx)
        } else if (x >= bounds.w) {
          x = bounds.w
          vx = -Math.abs(vx)
        }

        if (y <= 0) {
          y = 0
          vy = Math.abs(vy)
        } else if (y >= bounds.h) {
          y = bounds.h
          vy = -Math.abs(vy)
        }

        img.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // stop moving when the panel is off screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = performance.now()
    })
    io.observe(panel)

    // hovering the panel pauses the image so it is easy to look at
    const pause = () => (paused = true)
    const resume = () => {
      paused = false
      last = performance.now()
    }
    panel.addEventListener('mouseenter', pause)
    panel.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      img.removeEventListener('load', measure)
      panel.removeEventListener('mouseenter', pause)
      panel.removeEventListener('mouseleave', resume)
    }
  }, [size, speed])

  return (
    <div
      ref={panelRef}
      aria-hidden={alt ? undefined : 'true'}
      className="relative mt-10 hidden self-stretch overflow-hidden lg:block"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="absolute left-0 top-0 select-none will-change-transform"
        style={{ width: size, height: 'auto' }}
      />
    </div>
  )
}
