interface Props {
  statusCode: number
}
function Error({ statusCode }: Props) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server. Please get in touch via email at hello@frontend.ro if the problem persists`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  // const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  let statusCode = res ? res.statusCode : 404;

  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  } else {
    statusCode = 404;
  }

  return { statusCode };
};

export default Error;
