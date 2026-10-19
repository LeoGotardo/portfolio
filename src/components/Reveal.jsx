import { m } from 'motion/react'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

// Fades and lifts content in once it enters the viewport. MotionConfig
// (reducedMotion="user") drops the transform for reduced-motion users.
export default function Reveal({ as = 'div', delay = 0, y = 28, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
