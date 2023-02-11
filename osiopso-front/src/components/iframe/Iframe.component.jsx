const Iframe = (props) => {

	return (
			<div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
	)
}

export default Iframe