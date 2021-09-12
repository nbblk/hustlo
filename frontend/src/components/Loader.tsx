const Loader = (props: any) => {
  return (
    <div
      className={`${
        props.loading ? "block" : "hidden"
      } lds-default absolute z-50 top-1/2 left-1/2 transform -x-translate-1/2 -y-translate-1/2`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
