let component = ReasonReact.statelessComponent("Link");

let make = (href, children) => {...component, render: _self => <Next.Link href> <a> ...children </a> </Next.Link>};
