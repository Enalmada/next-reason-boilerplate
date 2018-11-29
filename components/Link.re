let component = ReasonReact.statelessComponent("DataPrefetchLinkHover");

let make =
    (
      ~href: string,
      ~prefetch=false,
      ~replace=false,
      ~shallow=false,
      ~passHref=false,
      ~withHover=false,
      ~title="",
      ~id: string="",
      ~className: string="",
      ~style=ReactDOMRe.Style.make(),
      children,
    ) => {
  ...component,
  render: _self =>
    <Next.Link href prefetch replace shallow passHref>
      {
        withHover ?
          <a id className style title onMouseOver={event => Prefetch.prefetch(event->ReactEvent.Mouse.target##href)}>
            ...children
          </a> :
          <a id className style title> ...children </a>
      }
    </Next.Link>,
};
