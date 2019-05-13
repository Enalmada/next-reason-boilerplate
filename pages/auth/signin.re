[@react.component]
let make = () => {
  /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
  <ConsumerPage nav=`signin>
    <NextSeo title="Sign In" />
    <SigninBox />
    {ReasonReact.string("New? ")}
    <Next.Link prefetch={Some(true)} href="/auth/createAccount">
      <a> {ReasonReact.string(" Create account")} </a>
    </Next.Link>
  </ConsumerPage>;
};
