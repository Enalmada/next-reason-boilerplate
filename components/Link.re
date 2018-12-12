let component = ReasonReact.statelessComponent("DataPrefetchLinkHover");
/*
 For some reason it doesn't see this as string
 onMouseOver={event => Prefetch.prefetch(event->ReactEvent.Mouse.target##href) */
let make =
    (
      ~href: string="",
      ~_as: string="",
      ~prefetch=true,
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
    <ApolloConsumer>
      ...{apolloClient =>
        <Next.Link href _as prefetch replace shallow passHref>
          {withHover ?
             <a id className style title onMouseEnter={_event => Prefetch.prefetch(href, apolloClient, true)}>
               ...children
             </a> :
             <a id className style title> ...children </a>}
        </Next.Link>
      }
    </ApolloConsumer>,
};
