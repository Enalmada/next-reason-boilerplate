[@react.component]
/*
 For some reason it doesn't see this as string
 onMouseOver={event => Prefetch.prefetch(event->ReactEvent.Mouse.target##href) */
let make =
    (
      ~href,
      ~_as: string=?,
      ~prefetch=?,
      ~replace=?,
      ~shallow=?,
      ~passHref=?,
      ~withHover: option(bool)=?,
      ~withData: option(bool)=?,
      ~title=?,
      ~onMouseEnter=?,
      ~id=?,
      ~className=?,
      ~style: option(ReactDOMRe.Style.t)=?,
      ~children: React.element,
    ) => {
  <Next.Link href _as prefetch replace shallow passHref>
    <a ?id ?className ?style ?title ?onMouseEnter> children </a>
  </Next.Link>;
};

/*

   // Prefetching is not working with the latest jsx3...commenting it out for now to isolate and fix later

 let component = ReasonReact.statelessComponent("DataPrefetchLinkHover");

 [@bs.deriving abstract]
 type hrefWithQuery = {
   pathname: string,
   [@bs.optional]
   query: Js.Dict.t(string),
 };

 let finalHref = (href, hrefWithQuery) =>
   switch (hrefWithQuery) {
   | None => Prefetch.hrefWithQuery(~pathname=href, ())
   | Some(hrefWithQueryReal) =>
     Prefetch.hrefWithQuery(
       ~pathname=pathnameGet(hrefWithQueryReal),
       ~query=
         switch (queryGet(hrefWithQueryReal)) {
         | None => Js.Dict.empty()
         | Some(something) => something
         },
       (),
     )
   };

 /*
  For some reason it doesn't see this as string
  onMouseOver={event => Prefetch.prefetch(event->ReactEvent.Mouse.target##href) */
 let make =
     (
       ~href: string="",
       ~hrefWithQuery: option(hrefWithQuery)=?,
       ~_as: string="",
       ~prefetch=false,
       ~replace=false,
       ~shallow=false,
       ~passHref=false,
       ~withHover=true,
       ~withData=false,
       ~title: option(string)=?,
       ~onMouseEnter: option(ReactEvent.Mouse.t => unit)=?,
       ~id: option(string)=?,
       ~className: option(string)=?,
       ~style=?,
       children,
     ) => {
   ...component,
   render: _self =>
     <ApolloConsumer>
       ...{apolloClient =>
         <Next.Link href={finalHref(href, hrefWithQuery)} _as prefetch replace shallow passHref>
           {withHover ?
              <a
                ?id
                ?className
                ?style
                ?title
                onMouseEnter={_event => Prefetch.prefetch(finalHref(href, hrefWithQuery), apolloClient, withData)}>
                /* Prefetch.prefetch(href, apolloClient) */
                /* here is where next.js does it https://github.com/zeit/next.js/blob/15bb1c5e7963361c9c592923ef28cd819092e49a/packages/next/client/page-loader.js */
                /*  This works but it is not populating apollo
                     let link = [%bs.raw
                       {| document.head.appendChild(Object.assign(document.createElement("link"), {
                                            	rel: "prefetch",
                                            	id: "prefetchLink",
                                            	href: href
                                            })) |}
                     ];
                    */
                 ...children </a> :
              <a ?id ?className ?style ?title ?onMouseEnter> ...children </a>}
         </Next.Link>
       }
     </ApolloConsumer>,
 };


    */
