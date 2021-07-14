const BrandLogos = () => (
  <div className="flex sm:flex-row flex-col filter grayscale">
    {["google", "fender", "squarespace", "costco-wholesale"].map(
      (logo, index) => (
        <img
          key={index}
          alt={logo}
          width="100"
          src={`./${logo}.svg`}
          className="block m-4"
        />
      )
    )}
  </div>
);

export default BrandLogos;
