const HeadLayout = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <>
      <link
        rel="stylesheet"
        href={`${process.env.PUBLIC_URL}/assets/css/style.css`}
        type="text/css"
      />
    </>
  );
};

export default HeadLayout;
