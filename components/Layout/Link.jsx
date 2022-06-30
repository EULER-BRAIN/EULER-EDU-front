import LinkOri from 'next/link';

const Link = (props) => {
  if (props.to) {
    return (
      <LinkOri href={ props.to }>
        <a>
          { props.children }
        </a>
      </LinkOri>
    )
  }
  return (
    <a href={ props.href }>
      { props.children }
    </a>
  )
}

export default Link
