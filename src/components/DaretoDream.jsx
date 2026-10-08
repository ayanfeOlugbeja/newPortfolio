import { useEffect, useRef } from 'react'
import dividerimage from '../assets/images/dividerimage.jpg'
const BASE_SPEED = 60 // px per second when idle
const SCROLL_BOOST = 0.9 // how strongly scroll velocity speeds the text up

function MarqueeRow({ text, color, direction, rowRef }) {
  // Repeat the phrase so the row is always wider than the screen
  const items = Array.from({ length: 6 })
  return (
    <div className="dtd-row" style={{ color }}>
      <div className="dtd-track" ref={rowRef} data-dir={direction}>
        {items.map((_, i) => (
          <span key={i} className="dtd-word">
            {text}&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}

export default function DareToDream() {
  const rowA = useRef(null)
  const rowB = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const rows = [
      { el: rowA.current, dir: -1, offset: 0 }, // moves left
      { el: rowB.current, dir: 1, offset: 0 }, // moves right
    ]

    let lastY = window.scrollY
    let lastT = performance.now()
    let velocity = 0 // smoothed scroll speed (px/s)
    let raf

    const tick = (now) => {
      const dt = Math.min((now - lastT) / 1000, 0.05)
      lastT = now

      const y = window.scrollY
      const instant = dt > 0 ? Math.abs(y - lastY) / dt : 0
      lastY = y

      // ease toward the current scroll speed so changes feel smooth
      velocity += (instant - velocity) * 0.12

      const speed = reduced ? 0 : BASE_SPEED + velocity * SCROLL_BOOST

      rows.forEach((r) => {
        if (!r.el) return
        const loopWidth = r.el.scrollWidth / 6 // width of one repeated phrase
        r.offset += r.dir * speed * dt

        // wrap seamlessly
        if (r.offset <= -loopWidth) r.offset += loopWidth
        if (r.offset >= 0 && r.dir > 0) r.offset -= loopWidth

        r.el.style.transform = `translate3d(${r.offset}px,0,0)`
      })

      raf = requestAnimationFrame(tick)
    }

    // start the right-moving row offset so it has room to travel
    if (rowB.current) rows[1].offset = -rowB.current.scrollWidth / 6

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <style>{css}</style>

      {/* Tall page so there is room to scroll */}
      <main className="dtd-page">
        <section className="dtd-stage">
          <div className="dtd-text">
            <MarqueeRow
              text="Dare to dream."
              color="#0a0a0a"
              direction="left"
              rowRef={rowA}
            />
            <MarqueeRow
              text="Dream big."
              color="#f7812c"
              direction="right"
              rowRef={rowB}
            />
          </div>

          <figure className="dtd-frame">
            <img src={dividerimage} alt="A dreamer looking ahead" />
          </figure>
        </section>
      </main>
    </>
  )
}

const css = `
  .dtd-page {
    background: #ffffff;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .dtd-stage {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: grid;
    place-items: center;
  }

  /* Text sits behind the picture */
  .dtd-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    z-index: 1;
  }

  .dtd-row {
    overflow: hidden;
    white-space: nowrap;
    line-height: 0.95;
  }

  .dtd-track {
    display: inline-block;
    will-change: transform;
  }

  .dtd-word {
    font-size: clamp(5rem, 17vw, 17rem);
    font-weight: 900;
    letter-spacing: -0.05em;
  }

  /* Picture on top */
  .dtd-frame {
    position: relative;
    z-index: 2;
    margin: 0;
    width: min(64vw, 1100px);
    aspect-ratio: 16 / 9;
    background: #000;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
    overflow: hidden;
  }

  .dtd-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }



  @media (max-width: 640px) {
    .dtd-frame { width: 88vw; }
  }
`
