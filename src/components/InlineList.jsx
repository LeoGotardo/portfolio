import { Fragment } from 'react'

// Items never break internally and the separator (CSS ::after) stays at the end
// of a line, so a wrapped list never starts a line with "·" or "/".
export default function InlineList({ items, className = '' }) {
  return (
    <ul className={`inline-list ${className}`.trim()}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && ' '}
          <li>{item}</li>
        </Fragment>
      ))}
    </ul>
  )
}
