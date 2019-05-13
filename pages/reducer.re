[@react.component]
let make = () => {
  <>
    /* <NextSeo title="reducer" /> */
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage nav=`reducer>
      <h1>
        {ReasonReact.string("Counter demonstrating reason reducer component")}
      </h1>
      <Counter />
    </ConsumerPage>
  </>;
};

let default = make;
