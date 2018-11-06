let component = ReasonReact.statelessComponent("Index");

[@bs.deriving abstract]
type nextSeoConfig = {
  canonical: string,
  title: string,
};

let config = nextSeoConfig(~canonical="https://www.example.com/about", ~title="About");

let make = _children => {
  ...component,
  render: _self =>
    /* <ReactHelmet> <title> {ReasonReact.string("AboutPage")} </title> </ReactHelmet> */
    <ConsumerPage>
      <NextSeo config />
      <div>
        <h1> {ReasonReact.string("Star Wars")} </h1>
        <Persons />
        <AddPerson />
        <GetPerson />
        <PersonById />
        <PersonByIdDelete />
        <DeletePerson />
        <SubscribeToPersons />
      </div>
    </ConsumerPage>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
